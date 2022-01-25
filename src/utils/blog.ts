import { APIPost } from "@/api/types";

export const getImage = (post: APIPost, thumbnail = false): string | null => {
  if (thumbnail) {
    return post.thumbnail
      ? post.thumbnail
      : require("@/assets/icons/document.svg");
  }
  return post.image;
};
