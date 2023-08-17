import { AxiosResponse } from "axios";
import API from "..";
import { Paginator } from "../types";
import { APICompactUser } from "./auth";

export interface APIPost {
  date: string;
  title: string;
  content: string;
  author: APICompactUser;
  image: string | null;
  slug: string;
  id: number;
  thumbnail: string;
  summary: string;
}

export interface APICreatePost {
  title: string;
  content: string;
  author: string;
  image?: File;
  slug: string;
}

export interface BlogListParams {
  page?: number;
  search?: string;
}

export enum BlogAPIURLS {
  LIST = "blog/",
  RETRIEVE = "blog/",
  CREATE = "blog/",
  DELETE = "blog/",
}

export const listPosts = (params?: BlogListParams): Promise<AxiosResponse<Paginator<APIPost>>> => {
  return API.noAuthAxios.get<Paginator<APIPost>>(BlogAPIURLS.LIST, {
    params: params,
  });
};

export const retrievePost = (slug: string): Promise<AxiosResponse<APIPost>> => {
  return API.noAuthAxios.get<APIPost>(BlogAPIURLS.RETRIEVE + slug);
};

/**
 * Create a new blog post.
 *
 * @param fd ``FormData`` object
 * @returns ``AxiosResponse``
 */
export const createPost = (fd: FormData): Promise<AxiosResponse> => {
  return API.axios.post(BlogAPIURLS.CREATE, fd, {
    headers: {
      "Content-Type": `multipart/form-data;`,
    },
  });
};

export const deletePost = (slug: string): Promise<AxiosResponse> => {
  return API.axios.delete(BlogAPIURLS.DELETE + slug);
};

/**
 * Get a name of an author of a post.
 *
 * @param post The post object.
 * @returns Name of the author of the post.
 */
export const postAuthor = (post: APIPost): string => {
  return `${post.author.first_name} ${post.author.surname}`;
};
