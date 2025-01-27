// src/app/api/scrape/route.js
import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { isProd } from "@/lib/constants";
import supabase from "@/services/supabase/setup";
import { delay } from "@/services/puppeteer/refreshCalendars";
import { convertToTimestamp } from "@/lib/dates/convertToTimestamp";

export async function POST(req) {
  try {
    const { url } = await req.json(); // Extract URL from request body

    if (!url) {
      return NextResponse.json(
        { message: "Missing URL in request body." },
        { status: 400 }
      );
    }

    let browser = null;
    try {
      console.log("Launching browser...");

      if (isProd) {
        browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(
            process.env.CHROMIUM_TAR
          ),
          headless: true,
          ignoreHTTPSErrors: true,
        });
      } else {
        const puppeteerDev = await import("puppeteer");
        browser = await puppeteerDev.launch({ headless: false });
      }

      console.log("Browser launched successfully");

      const page = await browser.newPage();

      await page.goto(url, { waitUntil: "networkidle2" });
      await delay(5000); // Important to ensure content loads

      // Check if the target element exists before proceeding
      await page.waitForSelector(
        '[data-testid="organizer-profile__events"] div',
        { timeout: 10000 }
      ); // Wait for up to 10 seconds

      const events = await page.evaluate(() => {
        const futureEventsSection = document.querySelector(
          '[data-testid="organizer-profile__future-events"]'
        );
        if (!futureEventsSection) return [];

        const eventCards = Array.from(
          futureEventsSection.querySelectorAll(".event-card")
        );

        // Use a Map to store unique events by event_id
        const eventMap = new Map();

        eventCards.forEach((eventCard) => {
          const linkElement = eventCard.querySelector("a");
          const titleElement = eventCard.querySelector("h3");
          const pElements = eventCard.querySelectorAll("p");
          const eventDate = pElements[0]?.innerText.trim() || null;
          const eventLocation = pElements[1]?.innerText.trim() || null;
          const eventPrice = pElements[2]?.innerText.trim() || null;
          const imgElement = eventCard.querySelector("img");

          const event_id = linkElement?.getAttribute("data-event-id") || null;
          const link_url = linkElement?.href || null;
          const title = titleElement?.innerText.trim() || null;
          const img_url = imgElement?.src || null;

          if (title && img_url && event_id) {
            // Only add if event_id doesn't exist in the Map
            if (!eventMap.has(event_id)) {
              eventMap.set(event_id, {
                event_id,
                link_url,
                img_url,
                title,
                raw_date: eventDate,
                location: eventLocation,
                price: eventPrice,
              });
            }
          }
        });

        // Convert Map values back to array
        return Array.from(eventMap.values());
      });
      const processedEvents = events.map((event) => {
        const eventDate = event.raw_date
          ? convertToTimestamp(event.raw_date)
          : null;

        return {
          ...event,
          event_date: eventDate, // Ensure null is explicitly set
        };
      });
      console.log("Processed events:", processedEvents);

      const { data, error } = await supabase
        .from("upcoming_events")
        .upsert(processedEvents, { onConflict: ["event_id"] })
        .select();

      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json(
          { message: "Error inserting data into Supabase." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { data: processedEvents, message: "Scrape completed successfully!" },
        { status: 200 }
      );
    } finally {
      if (browser) await browser.close();
    }
  } catch (error) {
    console.error("Scrape process error:", error);
    return NextResponse.json(
      { message: "Error during the scraping process.", error: error.message },
      { status: 500 }
    );
  }
}
