"use client";

export default function DownloadButton({ url, filename, children }) {
  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Could not download file.");
    }
  };

  return (
    <button onClick={handleDownload}>
      {children || "Download"}
    </button>
  );
}
