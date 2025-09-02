import { httpService } from '@/lib/http-service';
import { RegisterFormData, RegisterResponse } from './register.types';

export async function register(data: RegisterFormData): Promise<RegisterResponse> {
  const response = await httpService.post<RegisterResponse>('/auth/register', data);
  
  if (response.data?.token) {
    httpService.setAuthToken(response.data.token);
  }
  
  return response.data!;
}