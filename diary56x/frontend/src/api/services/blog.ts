import { AxiosResponse } from "axios";
import { APIServiceType } from "..";
import { Post } from "../models";
import { APICreatePost, APIPost, Paginator } from "../types";

export interface BlogListParams {
  page?: number;
  search?: string;
}

export enum BlogAPIURLS {
  LIST = "blog/",
  RETRIEVE = "blog/",
  CREATE = "blog/",
}

export default class BlogService {
  API: APIServiceType;

  constructor(api: APIServiceType) {
    this.API = api;
  }

  public list(
    params?: BlogListParams
  ): Promise<AxiosResponse<Paginator<APIPost>>> {
    return this.API.axios.get<Paginator<APIPost>>(BlogAPIURLS.LIST, {
      params: params,
    });
  }

  public retrieve(id: number): Promise<AxiosResponse<APIPost>> {
    return this.API.axios.get<APIPost>(BlogAPIURLS.RETRIEVE + id);
  }

  public create(post: APICreatePost): Promise<AxiosResponse> {
    return this.API.axios.post(BlogAPIURLS.CREATE, {
      ...post,
    });
  }
}
