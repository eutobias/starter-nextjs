import * as Yup from 'yup';

// Validation for registration (creation)
export const registerValidations = Yup.object({
  name: Yup.string()
    .required('Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),

  email: Yup.string()
    .required('Email é obrigatório')
    .email('Email deve ter um formato válido')
    .max(255, 'Email deve ter no máximo 255 caracteres'),

  password: Yup.string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      'Senha deve conter pelo menos uma letra e um número'
    ),

  repeatPassword: Yup.string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([Yup.ref('password')], 'Senhas devem ser iguais')
});
