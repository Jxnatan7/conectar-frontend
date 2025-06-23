import api from "./axios";
import {
  User,
  CreateUserDto,
  UpdateUserDto,
  FilterQuery,
  PaginatedResult,
} from "./types";

export async function createUser(user: CreateUserDto): Promise<User> {
  const response = await api.post<User>("/users", user);
  return response.data;
}

export async function listUsers(
  query?: FilterQuery
): Promise<PaginatedResult<User>> {
  const response = await api.get<PaginatedResult<User>>("/users", {
    params: query,
  });
  return response.data;
}

export async function listInactiveUsers(
  query?: FilterQuery
): Promise<PaginatedResult<User>> {
  const response = await api.get<PaginatedResult<User>>("/users/inactive", {
    params: query,
  });
  return response.data;
}

export async function getUserById(id: string): Promise<User> {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
}

export async function updateUser(
  id: string,
  payload: UpdateUserDto
): Promise<User> {
  const response = await api.put<User>(`/users/${id}`, payload);
  return response.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}
