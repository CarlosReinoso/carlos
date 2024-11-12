"use client";
import { baseURL } from "@/lib/constants";
import Button from "@/components/common/Button";
import { useState } from "react";

const Admin = () => {
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${baseURL}/api/scrape`);
      const result = await response.json();

      alert(result.message || "Scrape completed successfully!");
    } catch (error) {
      console.error("Error during scrape:", error);
      alert("There was an error during scraping.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-start h-[100vh]">
      <Button theme="dark" onClick={handleScrape} disabled={loading}>
        {loading ? "Scraping..." : "Scrape"}
      </Button>
    </div>
  );
};

export default Admin;
