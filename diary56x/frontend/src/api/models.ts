import { APIPost, APIUser, AccountTypes } from "./types";

export class Post {
  public readonly data: APIPost;

  constructor(data: APIPost) {
    this.data = data;
  }
}

export class User {
  public readonly data: APIUser;

  constructor(user: APIUser) {
    this.data = user;
  }

  public get isAdmin(): boolean {
    return (
      this.data.account_type === AccountTypes.ADMIN ||
      this.data.account_type === AccountTypes.ROOT
    );
  }

  public get isTeacher(): boolean {
    return this.data.account_type === AccountTypes.TEACHER;
  }

  public get isStudent(): boolean {
    return this.data.account_type === AccountTypes.STUDENT;
  }
}

export type Model = Post | User;
