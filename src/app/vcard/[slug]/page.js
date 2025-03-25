import DownloadButton from "@/components/vcard/DownloadButton";
import supabase from "@/services/supabase/config";
import Image from "next/image";

export async function generateMetadata({ params }) {
  return {
    title: `vCard | ${params.slug}`,
    description: `Scan ${params.slug}'s details and save them instantly.`,
  };
}

export default async function VCardSlugPage({ params }) {
  const { slug } = params;

  const { data: vcardData, error } = await supabase
    .from("vcards")
    .select("name, surname, qr_url")
    .eq("slug", slug);

  const vcard = vcardData[0];
  if (!vcard || error) {
    return (
      <div className="text-center text-red-500 p-10">
        This vCard could not be found.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-white ">
      <h2>Scan me</h2>
      <h3 className="text-second">
        {vcard.name} {vcard.surname}
      </h3>

      <div className="bg-white p-4 rounded-xl shadow-lg">
        <Image
          src={vcard.qr_url}
          alt={`QR for ${vcard.name}`}
          width={300}
          height={300}
          className="rounded"
        />
      </div>

      <DownloadButton url={vcard.qr_url} filename={vcard.name}>
        Download Your QR Code
      </DownloadButton>
    </div>
  );
}
