import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useResponsiveView from "@/app/hooks/useResponsiveView";
import { formatDateToUK } from "@/app/util";

const BookingCalendar = ({ selectedDates, setSelectedDates, setError }) => {
  const [value, setValue] = useState(selectedDates || [new Date(), new Date()]);
  const [blockedDates, setBlockedDates] = useState([]);
  const [checkoutOnlyDates, setCheckoutOnlyDates] = useState([]);
  const showDoubleView = useResponsiveView();

  const fetchBlockedDates = async () => {
    try {
      const response = await fetch("/api/lodgify/availability");

      if (!response.ok) {
        throw new Error("Failed to fetch iCal data");
      }

      const data = await response.json();
      const unavailableDates = [];
      const checkoutOnly = [];

      const blockedRanges = data
        .filter((entry) => !entry.is_available)
        .map((entry) => ({
          start: new Date(entry.period_start),
          end: new Date(entry.period_end),
        }))
        .sort((a, b) => a.start - b.start);

      const mergedRanges = [];
      let currentRange = blockedRanges[0];

      for (let i = 1; i < blockedRanges.length; i++) {
        const nextRange = blockedRanges[i];

        if (
          currentRange.end >=
          new Date(nextRange.start.setDate(nextRange.start.getDate() - 1))
        ) {
          currentRange.end = new Date(
            Math.max(currentRange.end.getTime(), nextRange.end.getTime())
          );
        } else {
          mergedRanges.push(currentRange);
          currentRange = nextRange;
        }
      }
      mergedRanges.push(currentRange);

      mergedRanges.forEach((range) => {
        const dates = [];

        for (
          let d = new Date(range.start);
          d <= range.end;
          d.setDate(d.getDate() + 1)
        ) {
          const formattedDate = formatDateToUK(d);
          dates.push(formattedDate);
        }

        unavailableDates.push(...dates);

        checkoutOnly.push(formatDateToUK(range.start));
      });

      setBlockedDates(unavailableDates);
      setCheckoutOnlyDates(checkoutOnly);
    } catch (error) {
      console.error("Error fetching or parsing blocked dates:", error);
    }
  };

  useEffect(() => {
    fetchBlockedDates();
  }, []);

  const disableTile = ({ date, view }) => {
    if (view !== "month") return false;

    const dateString = formatDateToUK(date);

    return (
      blockedDates.includes(dateString) &&
      !checkoutOnlyDates.includes(dateString)
    );
  };

  const handleDateChange = (date) => {
    if (Array.isArray(date)) {
      const [start, end] = date;

      const startDateString = formatDateToUK(start);

      const selectedRange = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        selectedRange.push(formatDateToUK(new Date(d)));
      }

      const isInvalidSelection = selectedRange
        .slice(0, -1)
        .some((date) => blockedDates.includes(date));

      if (isInvalidSelection) {
        setError(
          "Cannot book; some dates are unavailable. Please choose a fully available range."
        );
        setValue([new Date(), new Date()]);
        return;
      }

      if (checkoutOnlyDates.includes(startDateString)) {
        setError("You cannot check in on this date, checkout only.");
        return;
      }

      setError("");
      setValue(date);
      setSelectedDates(date);
    } else {
      setError("");
      setValue(date);
      setSelectedDates(date);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Calendar
        onChange={handleDateChange}
        value={value}
        selectRange={true}
        minDate={new Date()}
        showDoubleView={showDoubleView}
        returnValue="range"
        tileDisabled={disableTile}
        tileContent={({ date, view }) => {
          const dateString = formatDateToUK(date);
          if (view === "month" && checkoutOnlyDates.includes(dateString)) {
            return (
              <div className="group relative overflow-visible !overflow-visible">
                <span className="block w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            );
          }
        }}
        className="react-calendar rounded-lg shadow-lg overflow-hidden"
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString(locale, { weekday: "narrow" })
        }
      />
    </div>
  );
};

export default BookingCalendar;
