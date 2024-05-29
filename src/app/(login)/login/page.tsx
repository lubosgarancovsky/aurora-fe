import { LoginForm } from "@/components";

export default function LoginPage() {
  return (
    <div className="flex justify-center text-center p-16">
      <div className="flex flex-col gap-4">
        <h2 className="font-normal">Sign in to Aurora</h2>
        <LoginForm />
        <p>
          New to Aurora?{" "}
          <a href="/register" className="link">
            Create account.
          </a>
        </p>
      </div>
    </div>
  );
}
