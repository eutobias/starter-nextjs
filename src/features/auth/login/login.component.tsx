import { useRouter } from "next/router";
import { LoginFormData } from "@/features/auth/login/login.types";
import { Card } from "@/components/card.component";
import { Title } from "@/components/title.component";
import { InputField } from "@/components/input-field.component";
import { useFormHandler } from "@/hooks/useFormHandler";
import { Box } from "@/components/box.component";
import { loginValidations } from "@/features/auth/login/login.validations";
import { useLoginMutation } from "./login.hooks";

export const LoginForm = () => {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const {
    formData,
    errors,
    validate: validateForm,
    handleInputChange,
  } = useFormHandler<LoginFormData>({
    initialState: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isValid = await validateForm(loginValidations);
      if (!isValid) {
        return;
      }

      loginMutation.mutate({
        email: formData.email,
        password: formData.password,
      }, {
        onSuccess: () => {
          router.push('/');
        },
        onError: (error) => {
          console.error('Login failed:', error);
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

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? "Signing In..." : "Sign In"}
          </button>
        </Box>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/auth/register" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </Card>
  );
};
