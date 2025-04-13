import AuthProvider from "@/components/auth/AuthProvider";

function layout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default layout;
