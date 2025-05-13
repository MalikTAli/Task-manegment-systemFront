// src/utils/formatDate.js
export function formatDate(date) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const weekday = days[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const isPM = hours >= 12;
  const ampm = isPM ? "PM" : "AM";

  hours = hours % 12 || 12; // تحويل 0 إلى 12

  const formattedTime = `${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;

  return `${weekday}, ${day}, ${year} at ${formattedTime}`;
}
