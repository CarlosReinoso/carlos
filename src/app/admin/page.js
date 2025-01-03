"use client";
import { useState } from "react";
import Button from "@/components/common/Button";

const Admin = () => {
  const [url, setUrl] = useState(""); // State variable to store the entered URL
  const [loading, setLoading] = useState(false); // State variable for loading indicator

  const handleScrape = async () => {
    if (!url) {
      alert("Please enter a valid URL to scrape.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/scrape`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }), // Send POST request with URL data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json(); // Parse response JSON
      alert(result.message || "Scrape completed successfully!");
    } catch (error) {
      console.error("Error during scrape:", error);
      alert(
        "There was an error during scraping. Please check the logs for details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        placeholder="Enter URL to scrape"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full rounded-md border border-gray-300 p-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
      />
      <br />
      <Button theme="dark" onClick={handleScrape} disabled={loading}>
        {loading ? "Scraping..." : "Scrape"}
      </Button>
    </div>
  );
};

export default Admin;
