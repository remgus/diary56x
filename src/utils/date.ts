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

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

const dateUtils = {
  toShortDate,
  toShortDateTime,
  getCurrentYear,
};

export type DateUtils = typeof dateUtils;
export default dateUtils;
