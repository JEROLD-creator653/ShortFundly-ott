import { LoginPanel } from "@/components/login-panel";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ role?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const role = params.role === "admin" ? "admin" : "user";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 md:px-8">
      <LoginPanel
        role={role}
        redirectTo={role === "admin" ? "/admin" : "/profile"}
        title={role === "admin" ? "Admin Login" : "User Login"}
        subtitle={
          role === "admin"
            ? "Sign in to manage users, support chats, posters, and teasers."
            : "Sign in to manage your profile, subscription, and personalized AI recommendations."
        }
      />
    </div>
  );
}
