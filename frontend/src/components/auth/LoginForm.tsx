"use client";
import api from "@/lib/api";
import { sleep } from "@/lib/sleep";
import { setUser } from "@/store/auth/authSlice";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { CustomTextInput } from "../ui/CustomTextInput";
import PasswordField from "../ui/PasswordField";
import RedirectLink from "../ui/RedirectLink";
import AuthForm from "./AuthForm";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    setLoading(true);
    await sleep(1000);
    try {
      const response = await api.post("/users/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Login successful");
      dispatch(setUser(response.data.data));
      router.push("/dashboard");
    } catch (error: any) {
      setError(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthForm
      formTitle="Patient Login"
      buttonLabel="Login"
      loading={loading}
      onClick={handleLogin}
      error={error}
      Footer={<LoginFooter onClick={() => router.push("/register")} />}
    >
      <CustomTextInput
        name="username"
        label="Username*"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <PasswordField
        label="Password*"
        value={formData.password}
        handleChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <Box display="flex" justifyContent="flex-end">
        <RedirectLink href="/forgotPassword">Forgot Password?</RedirectLink>
      </Box>
    </AuthForm>
  );
}
function LoginFooter({ onClick }: { onClick: () => void }) {
  return (
    <>
      <Divider sx={{ my: 1 }} />

      <Typography textAlign="center" fontSize={14}>
        Don't have an account?
      </Typography>

      <Button
        variant="outlined"
        fullWidth
        sx={{
          borderRadius: 10,
          fontWeight: "bold",
        }}
        onClick={onClick}
      >
        Create Account
      </Button>
    </>
  );
}
