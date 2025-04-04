export function trackEvent(eventName, eventCategory, eventLabel) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
    });
  }
}

// 🔹 BOOKS: Chapter navigation, comments, etc.
export function trackBookEvent(eventName, eventLabel, chapter = "") {
  const label = chapter ? `${eventLabel} | ${chapter}` : eventLabel;
  trackEvent(eventName, "Books", label);
}

// 🔹 TRAVEL: Location clicks, open maps, blog reads, etc.
export function trackTravelEvent(eventName, eventLabel, location = "") {
  const label = location ? `${eventLabel} | ${location}` : eventLabel;
  trackEvent(eventName, "Travel", label);
}
