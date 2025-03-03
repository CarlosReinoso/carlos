import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
  const shopPageUrl = "https://www.gracebasak.com/shop?Category=All&page=2"; // Product listing page

  try {
    console.log("🚀 Opening Shop Page...");

    // Start Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(shopPageUrl, { waitUntil: "networkidle2" });

    // Extract product titles and URLs from the shop page
    const productLinks = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll('[data-hook="product-list-grid-item"]')
      )
        .map((el) => {
          const titleElement = el.querySelector("[role='group']");
          const urlElement = el.querySelector("a");

          if (!titleElement || !urlElement) return null;

          let title =
            titleElement.getAttribute("aria-label") || "Unknown Product";
          title = title.replace(/\s+gallery\s*$/i, "").trim(); // Remove "gallery" at the end

          return {
            title,
            url: urlElement.href.trim(),
          };
        })
        .filter(Boolean);
    });

    await page.close();

    if (!productLinks.length) {
      throw new Error("No products found on shop page.");
    }

    console.log("🚀 Extracted Product Titles & URLs:", productLinks.length);

    const scrapedProducts = [];

    for (const product of productLinks) {
      console.log("🚀 Scraping Product Page:", product.url);

      const productPage = await browser.newPage();
      await productPage.goto(product.url, { waitUntil: "networkidle2" });

      // Extract Product Data from `wix-warmup-data`
      const productData = await productPage.evaluate(() => {
        const scriptTag = document.querySelector("#wix-warmup-data");
        if (!scriptTag) {
          console.error("🚀 No wix-warmup-data found on page");
          return { error: "No wix-warmup-data found" };
        }

        let jsonData;
        try {
          jsonData = JSON.parse(scriptTag.innerText);
        } catch (error) {
          console.error("🚀 Failed to parse wix-warmup-data", error);
          return { error: "Failed to parse wix-warmup-data" };
        }

        console.log("🚀 Extracted Warmup Data:", jsonData);

        const pageData = jsonData.appsWarmupData
          ? Object.values(jsonData.appsWarmupData)[0]
          : null;

        if (!pageData) {
          console.error("🚀 appsWarmupData not found in warmup data");
          return { error: "appsWarmupData not found" };
        }

        // Extract product details
        const productInfo = Object.values(pageData).find(
          (data) => data?.catalog?.product
        )?.catalog?.product;

        if (!productInfo) {
          console.error("🚀 No product info found in warmup data");
          return { error: "No product info found" };
        }

        // Extract price and variant data
        return {
          title: productInfo.name,
          previewUrl: productInfo.media?.[0]?.fullUrl || "",
          basePrice: productInfo.formattedPrice,
          variants:
            productInfo.productItems?.map((variant) => ({
              title:
                productInfo.options?.[0]?.selections.find(
                  (s) => s.id === variant.optionsSelections?.[0]
                )?.value || "Default",
              price: variant.formattedPrice || productInfo.formattedPrice,
            })) || [],
        };
      });

      await productPage.close();

      if (productData.error) {
        console.error(`🚀 Failed to extract data for: ${product.title}`, productData.error);
        continue;
      }

      scrapedProducts.push({ ...productData, url: product.url });
      console.log("🚀 Extracted Product Data:", productData);
    }

    await browser.close();

    return NextResponse.json(scrapedProducts, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("🚀 Error Scraping Product Data:", error);
    return NextResponse.json(
      { error: "Failed to scrape product data" },
      { status: 500 }
    );
  }
}
