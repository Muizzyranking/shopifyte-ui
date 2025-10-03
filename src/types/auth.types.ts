import type { ApiResponse } from "@/types/api.types";

export interface RegisterData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export type BackendRegisterResponse = ApiResponse<null, { [key: string]: string[] }>;

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface UserProfile {
  id: string;
  email: string;
  hasShop?: boolean;
  username?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email_verified?: boolean;
}

export interface LoginResponseData {
  tokens: Tokens;
  user: UserProfile;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

export interface LoginData {
  email: string;
  password: string;
}
