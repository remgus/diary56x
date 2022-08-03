import { AxiosResponse } from "axios";
import API from "..";
import { APISubject } from "./subjects";

export interface APITimetableLesson {
  n: number;
  start: string;
  end: string;
  classroom: string;
  subject: APISubject;
  id: number;
  day: number;
}

export interface APIDeleteLessons {
  n: number;
  day: number;
  klass: number;
  subject: number;
}

export interface APICreateLessons {
  n: number;
  day: number;
  klass: number;
  subject: number;
  classroom: string;
}

export interface TimetableData {
  subject: APISubject;
  classrooms: string[] | string;
  n: number;
  start: string;
  end: string;
  id: number;
  day: number;
}

export interface APITimetableDay {
  weekday: number;
  lessons: TimetableData[][];
}

export enum TimetableAPIURLS {
  LIST = "timetable/",
  BULK_DELETE = "timetable/bulk-delete/",
  BULK_CREATE = "timetable/bulk-create/",
}

export const getTimetable = (
  klass_id: number
): Promise<AxiosResponse<APITimetableLesson[]>> => {
  return API.axios.get(TimetableAPIURLS.LIST + klass_id);
};

export const deleteTimetable = (
  to_delete: APIDeleteLessons[]
): Promise<AxiosResponse> => {
  return API.axios.delete(TimetableAPIURLS.BULK_DELETE, {
    data: to_delete,
  });
};

export const createTimetable = (
  lessons: APICreateLessons[]
): Promise<AxiosResponse> => {
  return API.axios.post(TimetableAPIURLS.BULK_CREATE, lessons);
};
