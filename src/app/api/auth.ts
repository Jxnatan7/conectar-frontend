import api from "./axios";
import { User, CreateUserDto } from "./types";

export async function login(email: string, password: string): Promise<User> {
  const response = await api.post<User>("/auth/login", { email, password });
  return response.data;
}

export async function register(user: CreateUserDto): Promise<User> {
  const response = await api.post<User>("/auth/register", user);
  return response.data;
}
