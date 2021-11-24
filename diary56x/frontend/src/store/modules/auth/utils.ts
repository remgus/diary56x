import { User } from "@/api/types";

export function getUserFromLocalStorage(): User | null {
  const user = localStorage.getItem("user");
  if (user) {
    return new User(JSON.parse(user));
  }
  return null;
}
