export interface AuthRequest {
  code: string;
  state: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  nickname: string;
}

export interface AuthUser {
  token: string;
  id: string;
}

export interface AuthError {
  isTrigger: boolean;
  message: string;
}
