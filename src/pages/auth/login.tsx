import { LoginForm } from "@/features/auth/login/login.component";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
