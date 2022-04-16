import { APIPost } from "@/api/services/blog";
import document_icon from "@/assets/icons/document.svg";

export const getImage = (post: APIPost, thumbnail = false): string | null => {
  return thumbnail
    ? post.thumbnail
      ? post.thumbnail
      : document_icon
    : post.image;
};

export default {
  getImage,
};
