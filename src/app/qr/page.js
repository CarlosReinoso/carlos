"use client";
import { useEffect, useState } from "react";

export default function ContactQrPage() {
  const [qr, setQr] = useState("");

  useEffect(() => {
    fetch("/api/qr")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setQr(data.qrCode);
        }
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Scan to Save My Contact</h1>
      {qr ? (
        <img src={qr} alt="Contact QR" className="w-64 h-64" />
      ) : (
        "Loading..."
      )}
    </div>
  );
}
