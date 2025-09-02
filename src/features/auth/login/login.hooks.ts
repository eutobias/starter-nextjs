import { useMutation } from '@tanstack/react-query';
import { login } from './login.service';
import { LoginFormData, LoginResponse } from './login.types';

export function useLoginMutation() {
  return useMutation<LoginResponse, Error, LoginFormData>({
    mutationFn: login,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
}