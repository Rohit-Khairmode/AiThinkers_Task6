import AuthLayout from "@/components/auth/AuthLayout";

function layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout imgUrl="./men.jpg">{children}</AuthLayout>;
}

export default layout;
