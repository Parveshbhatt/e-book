export interface User {
  id: string;
  email: string;
  name: string;
  password?: string; // Optional as we don't want to expose it in all contexts
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}