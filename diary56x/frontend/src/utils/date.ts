export function toShortDate(date: Date): string {
  return date.toLocaleDateString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
