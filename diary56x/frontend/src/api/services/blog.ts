import { AxiosResponse } from "axios";
import { APIServiceType } from "..";
import { Post } from "../models";
import { Paginator } from "../types";

export interface BlogListParams {
  page?: number;
  search?: string;
}

export enum BlogAPIURLS {
  LIST = "blog/",
  RETRIEVE = "blog/",
}

export default class BlogService {
  API: APIServiceType;

  constructor(api: APIServiceType) {
    this.API = api;
  }

  public list(
    params?: BlogListParams
  ): Promise<AxiosResponse<Paginator<Post>>> {
    return this.API.axios.get<Paginator<Post>>(BlogAPIURLS.LIST, {
      params: params,
    });
  }

  public retrieve(id: number): Promise<AxiosResponse<Post>> {
    return this.API.axios.get<Post>(BlogAPIURLS.RETRIEVE + id);
  }
}
