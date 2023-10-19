export interface AuthRequest {
  code: string;
  state: string;
}

export interface AuthResponse {
  token: string;
  user_id: string;
  nickname: string;
}
