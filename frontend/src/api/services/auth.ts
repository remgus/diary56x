import API from "@/api";
import { UserCredentials } from "@/store/modules/auth/types";
import { AxiosResponse } from "axios";
import { APISchool } from "./schools";

export interface APITokens {
  access: string;
  refresh: string;
}

export enum AuthAPIURLS {
  CREATE_STUDENT = "auth/users/create-student",
  CURRENT_USER = "auth/users/current",
  GET_TOKEN = "auth/token",
  REMOVE_TOKEN = "auth/logout",
  REFRESH_TOKEN = "auth/token/refresh",
}

export enum AccountTypes {
  ROOT,
  ADMIN,
  TEACHER,
  STUDENT,
}

export interface APITokens {
  access: string;
  refresh: string;
}

export interface APICompactUser {
  id: number;
  email: string;
  first_name: string;
  second_name: string;
  surname: string;
  account_type: AccountTypes;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  last_login: string | null;
  registration_date: string;
}

export interface APIUser extends APICompactUser {
  school: APISchool | null;
}

export interface CreateStudentData {
  first_name: string;
  surname: string;
  second_name?: string;
  email: string;
  password: string;
  school: number;
}

export const createStudent = (
  data: CreateStudentData
): Promise<AxiosResponse> => {
  return API.noAuthAxios.post(AuthAPIURLS.CREATE_STUDENT, data);
};

export const getCurrentUser = (): Promise<AxiosResponse<APIUser>> => {
  return API.axios.get<APIUser>(AuthAPIURLS.CURRENT_USER);
};

export const login = (credentials: UserCredentials): Promise<AxiosResponse> => {
  return API.noAuthAxios.post<APITokens>(AuthAPIURLS.GET_TOKEN, {
    email: credentials.email,
    password: credentials.password,
  });
};

export const logout = (refreshToken: string): Promise<AxiosResponse> => {
  return API.axios.post(AuthAPIURLS.REMOVE_TOKEN, {
    refresh: refreshToken,
  });
};

export const isAdmin = (user: APIUser): boolean => {
  return (
    user.account_type === AccountTypes.ADMIN ||
    user.account_type === AccountTypes.ROOT
  );
};

export const isTeacher = (user: APIUser): boolean => {
  return user.account_type === AccountTypes.TEACHER;
};

export const isStudent = (user: APIUser): boolean => {
  return user.account_type === AccountTypes.STUDENT;
};

type CheckTypes = "admin" | "teacher" | "student" | "root";

export const is = (user: APIUser, types: CheckTypes[]): boolean => {
  for (const type of types) {
    switch (type) {
      case "admin":
        if (isAdmin(user)) return true;
        break;
      case "teacher":
        if (isTeacher(user)) return true;
        break;
      case "student":
        if (isStudent(user)) return true;
        break;
      case "root":
        if (user.account_type === AccountTypes.ROOT) return true;
        break;
      default:
        break;
    }
  }
  return false;
};

export const pluginEnabled = (user: APIUser, name: string): boolean => {
  if (!user.school) return false;
  return user.school.plugins.findIndex((plugin) => plugin.name === name) !== -1;
};
