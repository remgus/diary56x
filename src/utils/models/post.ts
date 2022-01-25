import { APIPost } from "@/api/types";

/**
 * Get a name of an author of a post.
 *
 * @param post The post object.
 * @returns Name of the author of the post.
 */
export const postAuthor = (post: APIPost): string => {
  if (post.author.is_staff) return "ATK Dev Studio";
  return `${post.author.surname} ${post.author.first_name} ${post.author.second_name}`;
};
