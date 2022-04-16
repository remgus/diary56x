export type IconName = "admin" | "timetable" | "cactus" | "homework" | "notes";

export const getIconPath = (name: IconName) => {
  switch (name) {
    case "admin":
      return new URL("../assets/icons/admin.svg", import.meta.url);
      break;
    case "timetable":
      return new URL("../assets/icons/timetable.svg", import.meta.url);
      break;
    case "cactus":
      return new URL("../assets/icons/cactus.svg", import.meta.url);
      break;
    case "homework":
      return new URL("../assets/icons/homework.svg", import.meta.url);
      break;
    case "notes":
      return new URL("../assets/icons/notes.svg", import.meta.url);
      break;
  }
};
