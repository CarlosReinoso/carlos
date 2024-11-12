// pages/api/refresh-calendar.js
import supabase from "@/services/supabase/setup";
import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteerExtra from "puppeteer-extra";
import { isProd } from "@/lib/constants";

export async function GET() {
  try {
    const browser = await puppeteerExtra.launch({
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-blink-features=AutomationControlled",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
      ],
      executablePath: isProd
        ? await chromium.executablePath()
        : "C:\\Users\\jrpca\\Documents\\web-agency\\chromium\\chromium\\win64-1355085\\chrome-win\\chrome.exe",
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto(
      "https://www.eventbrite.co.uk/o/carlos-reinoso-24978075108",
      {
        waitUntil: "networkidle2",
      }
    );

    await page.waitForSelector('[data-testid="organizer-profile__events"]');

    // Extract image URLs for each event inside this section
    const events = await page.evaluate(() => {
      const eventContainer = document.querySelector(
        '[data-testid="organizer-profile__events"]'
      );
      if (!eventContainer) return [];

      const eventSections = Array.from(
        eventContainer.querySelectorAll("section.event-card-details")
      );
      console.log("🚀 ~ events ~ eventSections:", eventSections);

      // Use a Set to keep track of unique events
      const uniqueEvents = new Map();

      eventSections.forEach((section) => {
        const linkElement = section.closest(".event-card")?.querySelector("a");
        const titleElement = section.querySelector("h3");
        const imgElement = section.closest(".event-card")?.querySelector("img");

        const event_id = linkElement
          ? linkElement.getAttribute("data-event-id")
          : null;
        const link_url = linkElement ? linkElement.href : null;
        const title = titleElement ? titleElement.innerText : null;
        const img_url = imgElement ? imgElement.src : null;

        if (title && img_url) {
          // Create a unique key based on title and img_url
          const uniqueKey = `${title}_${img_url}`;
          if (!uniqueEvents.has(uniqueKey)) {
            uniqueEvents.set(uniqueKey, { event_id, link_url, title, img_url });
          }
        }
      });

      // Convert the Map values to an array of unique event objects
      return Array.from(uniqueEvents.values());
    });

    console.log(events);

    const { data, error } = await supabase
      .from("upcoming_events") // Replace "upcoming_events" with your actual table name
      .upsert(events, { onConflict: ["event_id"] }); // Using "upsert" to avoid duplicates
    console.log("🚀 ~ GET ~ data:", data);

    if (error) {
      console.error("Error inserting data into Supabase:", error);
      return NextResponse.json(
        { message: "Error inserting data", error },
        { status: 500 }
      );
    }
    await browser.close();

    return NextResponse.json(
      { data: events, message: "Scrape completed successfully!", error },
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
