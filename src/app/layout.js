import { generateMetadata } from "@/config/metadata";
import LayoutSelector from "@/components/LayoutSelector";
import { raleway, poppins, space, philosopher, gruppo } from "@/styles/fonts";
import "../styles/globals.css";
import Script from "next/script";

export { generateMetadata };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${poppins.variable} ${space.variable} ${philosopher.variable} ${gruppo.variable}`}
    >
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SWEWEHCXPR"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SWEWEHCXPR', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        <LayoutSelector>{children}</LayoutSelector>
      </body>
    </html>
  );
}
