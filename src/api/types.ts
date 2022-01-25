export enum AccountTypes {
  ROOT,
  ADMIN,
  TEACHER,
  STUDENT,
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
}

export interface APIUser extends APICompactUser {
  last_login: string;
  registration_date: string;
  is_superuser: boolean;
}

export interface APITokens {
  access: string;
  refresh: string;
}

export interface APIPost {
  date: string;
  title: string;
  content: string;
  author: APICompactUser;
  image: string | null;
  slug: string;
  id: number;
  thumbnail: string;
}

export interface APICreatePost {
  title: string;
  content: string;
  author: string;
  image?: File;
  slug: string;
}

export interface Paginator<T> extends RawPaginator {
  results: T[];
}

export interface RawPaginator {
  next: string | null;
  previous: string | null;
  count: number;
}

export type APIModel = APIPost | APIUser;
