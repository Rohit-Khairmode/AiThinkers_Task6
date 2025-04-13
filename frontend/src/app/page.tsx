import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

function Home() {
  return (
    <AuthLayout imgUrl="./girl.jpg">
      <LoginForm />
    </AuthLayout>
  );
}

export default Home;
