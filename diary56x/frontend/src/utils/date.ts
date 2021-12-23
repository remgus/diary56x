export const toShortDate = (date: Date): string => {
  return date.toLocaleDateString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const toShortDateTime = (date: Date): string => {
  return date.toLocaleDateString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

const dateUtils = {
  toShortDate,
  toShortDateTime,
};

export type DateUtils = typeof dateUtils;
export default dateUtils;
