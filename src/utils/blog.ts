import { APIPost } from "@/api/services/blog";

export const getImage = (post: APIPost, thumbnail = false): string | null => {
  if (thumbnail) {
    return post.thumbnail
      ? post.thumbnail
      : require("@/assets/icons/document.svg");
  }
  return post.image;
};

export default {
  getImage,
};
