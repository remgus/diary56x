import API from "@/api";
import { UserCredentials } from "@/store/modules/auth/types";
import { AxiosResponse } from "axios";
import { APIKlassCompact } from "./klasses";

export interface APITokens {
  access: string;
  refresh: string;
}

export enum AuthAPIURLS {
  CURRENT_USER = "auth/users/me",
  GET_TOKEN = "auth/jwt/create/",
  REMOVE_TOKEN = "auth/jwt/blacklist/",
  REFRESH_TOKEN = "auth/jwt/refresh/",
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
  last_name: string;
  surname: string;
  account_type: AccountTypes;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  last_login: string | null;
  date_joined: string;
}

export interface APIUserStudentOptions {
  is_monitor: boolean;
  klass: APIKlassCompact | null;
}

export interface APIUser extends APICompactUser {
  options_student: APIUserStudentOptions | null;
}

export interface CreateStudentData {
  first_name: string;
  surname: string;
  last_name?: string;
  email: string;
  password: string;
}

export const createStudent = (data: CreateStudentData): Promise<AxiosResponse> => {
  return API.noAuthAxios.post("auth/users/create-student", data);
};

export const getCurrentUser = (): Promise<AxiosResponse<APIUser>> => {
  return API.axios.get<APIUser>(AuthAPIURLS.CURRENT_USER);
};

export const login = (credentials: UserCredentials): Promise<AxiosResponse<APITokens>> => {
  return API.noAuthAxios.post(AuthAPIURLS.GET_TOKEN, {
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
  return user.account_type === AccountTypes.ADMIN || user.account_type === AccountTypes.ROOT;
};

export const isTeacher = (user: APIUser): boolean => {
  return user.account_type === AccountTypes.TEACHER;
};

export const isStudent = (user: APIUser): boolean => {
  return user.account_type === AccountTypes.STUDENT;
};

export const isSuperuser = (user: APIUser): boolean => {
  return user.account_type === AccountTypes.ROOT;
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
