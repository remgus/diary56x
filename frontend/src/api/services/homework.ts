import API from "..";
import { AxiosResponse } from "axios";
import { Paginator } from "../types";

export interface APIHomework {
  id: number;
  lesson: number;
  date: string;
  subject: number;
  content: string;
  attachments: APIHomeworkAttachment[];
}

export interface APIHomeworkAttachment {
  id: number;
  file: string;
}

interface ListHomeworkParams {
  date_before?: string;
  date_after?: string;
  has_content?: boolean;
}

interface CreateHomeworkData {
  date: string;
  group_id: number;
  content?: string;
  attachments?: FileList;
}

export const listHomework = (
  params: ListHomeworkParams
): Promise<AxiosResponse<Paginator<APIHomework>>> => {
  return API.axios.get("homework", { params });
};

export const addHomework = (
  data: CreateHomeworkData
): Promise<AxiosResponse<APIHomework>> => {
  const fd = new FormData();
  fd.append("date", data.date);
  fd.append("group", String(data.group_id));
  fd.append("content", data.content ? data.content : "");
  if (data.attachments) {
    for (const f of data.attachments) fd.append("attachments", f);
  }
  return API.axios.post("homework", fd);
};
