export const convertTime = date => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!timeZone) return undefined;
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone
  };
  date = new Date(date);
  return new Intl.DateTimeFormat("default", options).format(date);
};
