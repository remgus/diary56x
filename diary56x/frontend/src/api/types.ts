export enum AccountTypes {
  ROOT,
  ADMIN,
  TEACHER,
  STUDENT,
}

export interface APIUser {
  id: number;
  email: string;
  first_name: string;
  surname: string;
  second_name: string;
  account_type: AccountTypes;
  last_login: string;
  registration_date: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
}

export interface APITokens {
  access: string;
  refresh: string;
}

export interface APIPost {
  date: string;
  title: string;
  content: string;
  author: string;
  image: string;
  slug: string;
  id: number;
}

export interface APICreatePost {
  title: string;
  content: string;
  author: string;
  image?: string;
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
