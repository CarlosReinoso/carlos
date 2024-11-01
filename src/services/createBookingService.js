import { isProd } from "@/app/config/config";
import {
  apiBaseUrl,
  propertyId,
  roomId,
  websiteId,
} from "@/app/util/constants";

export const createBooking = async (session) => {
  const checkInDate = session.metadata?.check_in_date;
  const checkOutDate = session.metadata?.check_out_date;

  const customerEmail = isProd ? session.customer_details.email : "TEST_EMAIL";
  const customerName = session.customer_details.name;

  const bookingPayload = {
    guest: {
      name: customerName,
      email: customerEmail,
      phone: session.customer_details.phone || "N/A",
      street_address1:
        session.customer_details.address.line1 || "Default Address",
      city: session.customer_details.address.city || "Default City",
      country_code:
        session.customer_details.address.country || "United Kingdom",
      postal_code: session.customer_details.address.postal_code || "E15 4DF",
    },
    arrival: checkInDate,
    departure: checkOutDate,
    property_id: propertyId,
    status: "Booked",
    bookability: "InstantBooking",
    total: session.amount_total / 100,
    currency_code: session.currency.toUpperCase(),
    rooms: [
      {
        room_type_id: roomId,
        people: 1,
      },
    ],
    payment_website_id: websiteId,
  };

  try {
    const bookingResponse = await fetch(
      `${apiBaseUrl}/api/lodgify/create-booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      }
    );

    if (!bookingResponse.ok) {
      throw new Error(
        `Failed to create booking: ${bookingResponse.status} ${bookingResponse.statusText}`
      );
    }

    const bookingData = await bookingResponse.json();
    console.log("Booking created successfully:", bookingData);
    return bookingData;
  } catch (err) {
    console.error("Error during booking workflow:", err.message);
    throw err;
  }
};
