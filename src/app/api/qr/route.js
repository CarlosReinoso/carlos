import { NextResponse } from "next/server";
import QRCode from "qrcode";

export const revalidate = 0;

export async function GET() {
  console.log("📱 ~ QR Code generation endpoint triggered");

  const vCard = `
BEGIN:VCARD
VERSION:3.0
N:Reinoso;Carlos;;;
FN:Carlos Reinso
ORG:Reinso Web & Property
TEL:+447456531337
EMAIL:hello@carlosreinoso.co.uk
URL:https://carlosreinoso.co.uk/web-dev
ADR:;;London;;;;
NOTE:Web Dev & Property Investor
END:VCARD
  `.trim();

  try {
    const qrDataUrl = await QRCode.toDataURL(vCard, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 300,
    });

    return NextResponse.json(
      { success: true, qrCode: qrDataUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating QR code:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
