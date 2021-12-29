import { APIUser, AccountTypes } from "@/api/types";

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
