export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  accessLevel?: number;
}

export interface RegisterResponse {
  user?: {
    id: string;
    name: string;
    email: string;
    accessLevel: number;
  };
  token?: string;
  refreshToken?: string;
  error?: {
    message: string;
  };
}