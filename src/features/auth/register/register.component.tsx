import { Box } from "@/components/box.component";
import { Card } from "@/components/card.component";
import { InputField } from "@/components/input-field.component";
import { Title } from "@/components/title.component";
import {
  RegisterFormData
} from "@/features/auth/register/register.types";
import { registerValidations } from "@/features/auth/register/register.validations";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useRouter } from "next/router";
import { useRegisterMutation } from "./register.hooks";

export const RegisterForm = () => {
  const router = useRouter();
  const registerMutation = useRegisterMutation();

  const {
    formData,
    errors,
    validate: validateForm,
    handleInputChange,
  } = useFormHandler<RegisterFormData>({
    initialState: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isValid = await validateForm(registerValidations);
      if (!isValid) {
        return;
      }

      registerMutation.mutate({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        repeatPassword: formData.repeatPassword,
      }, {
        onSuccess: () => {
          router.push('/auth/login');
        },
        onError: (error) => {
          console.error('Registration failed:', error);
        }
      });
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl gap-6">
      <Title level={3}>Sign In</Title>

      <form onSubmit={handleSubmit}>
        <Box direction="column" className="gap-4">
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            type="text"
            error={errors?.name}
          />
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            error={errors?.email}
          />
          <InputField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
            error={errors?.password}
          />
          <InputField
            label="Repeat password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleInputChange}
            type="password"
            error={errors?.repeatPassword}
          />
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>
        </Box>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/auth/login" className="text-blue-600 hover:underline">
          Sign in
        </a>
      </p>
    </Card>
  );
};
