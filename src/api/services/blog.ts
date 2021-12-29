import { AxiosResponse } from "axios";
import { APIServiceType } from "..";
import { APIPost, Paginator } from "../types";

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
    return this.API.noAuthAxios.get<Paginator<APIPost>>(BlogAPIURLS.LIST, {
      params: params,
    });
  }

  public retrieve(id: number): Promise<AxiosResponse<APIPost>> {
    return this.API.noAuthAxios.get<APIPost>(BlogAPIURLS.RETRIEVE + id);
  }

  /**
   * Create a new blog post.
   *
   * @param fd ``FormData`` object
   * @returns ``AxiosResponse``
   */
  public create(fd: FormData): Promise<AxiosResponse> {
    return this.API.axios.post(BlogAPIURLS.CREATE, fd, {
      headers: {
        "Content-Type": `multipart/form-data;`,
      },
    });
  }
}
