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
        const container = document.querySelector(
          '[data-testid="organizer-profile__events"]'
        );
        if (!container) return [];

        const eventCards = Array.from(container.querySelectorAll("div"));
        const uniqueEvents = new Map();

        eventCards.forEach((section) => {
          const eventCard = section.closest(".event-card");
          if (!eventCard) return;

          const linkElement = eventCard.querySelector("a");
          const titleElement = eventCard.querySelector("h3");
          const pElements = eventCard.querySelectorAll("p");
          const eventDate = pElements[0]?.innerText.trim() || null; // Extract raw date string
          const eventLocation = pElements[1]?.innerText.trim() || null;
          const eventPrice = pElements[2]?.innerText.trim() || null;
          const imgElement = eventCard.querySelector("img");

          const event_id = linkElement?.getAttribute("data-event-id") || null;
          const link_url = linkElement?.href || null;
          const title = titleElement?.innerText.trim() || null;
          const img_url = imgElement?.src || null;

          if (title && img_url) {
            const uniqueKey = `${title}_${img_url}`;
            if (!uniqueEvents.has(uniqueKey)) {
              uniqueEvents.set(uniqueKey, {
                event_id,
                link_url,
                img_url,
                title,
                raw_date: eventDate, // Return raw date string
                location: eventLocation,
                price: eventPrice,
              });
            }
          }
        });

        return Array.from(uniqueEvents.values());
      });

      console.log("Raw events:", events);

      // Process dates after returning from browser context
      const processedEvents = events.map((event) => ({
        ...event,
        event_date: event.raw_date
          ? convertToTimestamp(event.raw_date) // Process the raw date string
          : null,
      }));

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
      // if (browser) await browser.close();
    }
  } catch (error) {
    console.error("Scrape process error:", error);
    return NextResponse.json(
      { message: "Error during the scraping process.", error: error.message },
      { status: 500 }
    );
  }
}
