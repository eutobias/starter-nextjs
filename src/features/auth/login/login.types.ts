export interface LoginFormData {
  email: string
  password: string
}

export interface LoginResponse {
  user?: {
    id: string
    name: string
    email: string
  }
  error?: {
    message: string
  }
}
