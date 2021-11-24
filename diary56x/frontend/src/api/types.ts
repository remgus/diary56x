import { AccountTypes, APIUser } from ".";

export class User {
  public readonly data: APIUser;

  constructor(user: APIUser) {
    this.data = user;
  }

  public isAdmin(): boolean {
    return (
      this.data.account_type === AccountTypes.ADMIN ||
      this.data.account_type === AccountTypes.ROOT
    );
  }

  public isTeacher(): boolean {
    return this.data.account_type === AccountTypes.TEACHER;
  }

  public isStudent(): boolean {
    return this.data.account_type === AccountTypes.STUDENT;
  }
}
