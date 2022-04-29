import { AxiosResponse } from "axios";
import API from "..";

export interface APISubject {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface APITimetableLesson {
  n: number;
  start: string;
  end: string;
  classroom: string;
  subject: APISubject;
  id: number;
  group: number;
  day: number;
}

export enum TimetableAPIURLS {
  LIST = "timetable/",
}

export const getTimeTable = (
  klass_id: number
): Promise<AxiosResponse<APITimetableLesson[]>> => {
  return API.axios.get(TimetableAPIURLS.LIST + klass_id);
};
