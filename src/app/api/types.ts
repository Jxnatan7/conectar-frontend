export enum UserRole {
  USER = "USER",
  MANAGER = "MANAGER",
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  token: string;
};

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

export type UpdateUserDto = {
  name: string;
  email: string;
  role: UserRole;
  token: string;
};

export type FilterQuery = {
  role?: UserRole;
  sort?: "name" | "createdAt";
  order?: "ASC" | "DESC";
  page?: number;
  limit?: number;
};

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};
