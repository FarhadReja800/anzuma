export type UserRole = "customer" | "superAdmin" | "admin" | "manager" | "moderator" | "user";

export interface StoredUser {
  name: string;
  email: string;
  tier: string;
  points: number;
  role: UserRole;
  phone?: string;
}

export interface UserEntry {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  joined: string;
}

export interface AuthUserResponse {
  id?: string | number;
  name?: string;
  username?: string;
  email?: string;
  role?: UserRole;
  tier?: string;
  points?: number;
  phone?: string;
}

export interface AuthAPIResponse extends AuthUserResponse {
  token?: string;
  accessToken?: string;
  message?: string;
  user?: AuthUserResponse;
  data?: {
    token?: string;
    user?: AuthUserResponse;
  };
}
