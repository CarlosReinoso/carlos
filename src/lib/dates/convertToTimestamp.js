import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export function convertToTimestamp(dateString) {
  if (!dateString) return null; // Handle null or undefined input

  let parsedDate = dayjs.tz(
    dateString,
    [
      "ddd, D MMM, HH:mm", // "Sun, 7 Dec, 10:00"
      "ddd, MMM D • h:mm A", // "Sat, Jan 18 • 6:00 PM"
      "ddd, D MMM • h:mm A", // "Sat, 18 Jan • 6:00 PM" (if order is sometimes reversed)
      "ddd, D MMM YYYY, HH:mm", // Add year if sometimes present
      "ddd, MMM D YYYY • h:mm A", // Add year if sometimes present
      "ddd, D MMM YYYY • h:mmA", // Add year if sometimes present
      "ddd, MMM D YYYY h:mm A", // Add year if sometimes present
      "ddd, D MMM YYYY h:mmA", // Add year if sometimes present
      "ddd, D MMM YYYY HH:mm", // Add year if sometimes present
      "ddd, MMM D YYYY HH:mm", // Add year if sometimes present
      "ddd, D MMM HH:mm",
      "ddd, MMM D HH:mm",
      "ddd, D MMM h:mm A",
      "ddd, MMM D h:mm A",
      "ddd, D MMM h:mmA",
      "ddd, MMM D h:mmA",
      // Add more formats as needed
    ],
    "Europe/London"
  ); // Specify the correct timezone if known

  if (!parsedDate.isValid()) {
    console.warn(`Could not parse date: ${dateString}`);
    return null;
  }

  //return parsedDate.valueOf(); // Milliseconds since epoch (Unix timestamp)
  return parsedDate.utc().format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //ISO 8601 format
}
