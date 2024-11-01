import { apiBaseUrlCalendars } from "@/app/util/constants";

async function refreshCalendar(apiUrl) {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to refresh calendar: ${response.status} ${response.statusText}`
      );
    }

    const refreshData = await response.json();
    console.log("Calendar refreshed successfully:", refreshData);
    return refreshData;
  } catch (error) {
    console.error(`Error refreshing calendar at ${apiUrl}:`, error.message);
    throw error;
  }
}

export const refreshCalendars = async () => {
  try {
    const airbnbCalendarUrl = `${apiBaseUrlCalendars}/api/airbnb`;
    await refreshCalendar(airbnbCalendarUrl);

    const lodgifyCalendarUrl = `${apiBaseUrlCalendars}/api/lodgify`;
    await refreshCalendar(lodgifyCalendarUrl);
  } catch (error) {
    console.error("Error during calendar refresh:", error.message);
  }
};
