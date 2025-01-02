import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { isProd } from "@/lib/constants"; // Assume this indicates dev/production
import supabase from "@/services/supabase/setup";
import { delay } from "@/services/puppeteer/refreshCalendars";

export async function GET() {
  let browser = null;
  try {
    console.log("Launching browser...");

    if (isProd) {
      // Production: Use puppeteer-core with Sparticuz Chromium
      console.log(
        "Using puppeteer-core with Sparticuz Chromium in production..."
      );
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(process.env.CHROMIUM_TAR), // Path to Chromium binary
        headless: true,
        ignoreHTTPSErrors: true,
      });
    } else {
      // Development: Use puppeteer with its bundled Chromium
      console.log("Using puppeteer in development...");
      const puppeteerDev = await import("puppeteer"); // Dynamically import puppeteer
      browser = await puppeteerDev.launch({
        headless: false, // Launch with a visible browser for debugging
      });
    }

    console.log("Browser launched successfully");

    const page = await browser.newPage();
    await page.goto(
      "https://www.eventbrite.co.uk/o/carlos-reinoso-24978075108",
      {
        waitUntil: "networkidle2",
      }
    );

    await delay(5000);

    await page.waitForFunction(() => {
      const container = document.querySelector(
        '[data-testid="organizer-profile__events"] div'
      );
      const cards = container.querySelectorAll("div");
      const cardsLoaded = cards.length > 0;
      return cardsLoaded;
    });

    const events = await page.evaluate(() => {
      const container = document.querySelector(
        '[data-testid="organizer-profile__events"]'
      );
      if (!container) return [];

      const eventCards = Array.from(container.querySelectorAll("div"));

      const uniqueEvents = new Map();

      eventCards.forEach((section) => {
        // Find the closest event card and query its details
        const eventCard = section.closest(".event-card");
        if (!eventCard) return;

        const linkElement = eventCard.querySelector("a");
        const titleElement = eventCard.querySelector("h3");
        const pElements = eventCard.querySelectorAll("p");
        const eventDate = pElements[0];
        const eventLocation = pElements[1];
        const eventPrice = pElements[2];
        const imgElement = eventCard.querySelector("img");

        const event_id = linkElement
          ? linkElement.getAttribute("data-event-id")
          : null;
        const link_url = linkElement ? linkElement.href : null;
        const title = titleElement ? titleElement.innerText.trim() : null;
        const event_date = eventDate ? eventDate.innerText.trim() : null;
        const location = eventLocation ? eventLocation.innerText.trim() : null;
        const price = eventPrice ? eventPrice.innerText.trim() : null;
        const img_url = imgElement ? imgElement.src : null;

        if (title && img_url) {
          // Create a unique key based on title and img_url
          const uniqueKey = `${title}_${img_url}`;
          if (!uniqueEvents.has(uniqueKey)) {
            uniqueEvents.set(uniqueKey, {
              event_id,
              link_url,
              img_url,
              title,
              event_date,
              location,
              price,
            });
          }
        }
      });

      return Array.from(uniqueEvents.values());
    });

    console.log("events", events);

    const { data, error } = await supabase
      .from("upcoming_events")
      .upsert(events, { onConflict: ["event_id"] })
      .select();
    console.log("🚀 ~ GET ~ data:", data);

    if (error) {
      console.log("🚀 ~ GET ~ error:", error);
      throw new Error("Error inserting data into Supabase:", error);
    }
    await browser.close();

    return NextResponse.json(
      { data: events, message: "Scrape completed successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during the process:", error);
    return NextResponse.json(
      { message: "Error during the process", error },
      { status: 500 }
    );
  }
}
