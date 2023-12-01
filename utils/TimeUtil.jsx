export function formatDateAndTime(timestamp) {
  const dateTime = new Date(timestamp);

  // Convert timestamp to string
  const dateString = dateTime.toLocaleString();
  return dateString;
}
