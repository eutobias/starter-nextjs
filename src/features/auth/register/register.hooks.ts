import { useMutation } from '@tanstack/react-query';
import { register } from './register.service';
import { RegisterFormData, RegisterResponse } from './register.types';

export function useRegisterMutation() {
  return useMutation<RegisterResponse, Error, RegisterFormData>({
    mutationFn: register,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
}