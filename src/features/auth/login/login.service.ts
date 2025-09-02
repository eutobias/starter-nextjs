import { httpService } from '@/lib/http-service';
import { LoginFormData, LoginResponse } from './login.types';

export async function login(data: LoginFormData): Promise<LoginResponse> {
  const response = await httpService.post<LoginResponse>('/auth/login', data);
  
  if (response.data?.token) {
    httpService.setAuthToken(response.data.token);
  }
  
  return response.data!;
}