import api from "@/lib/api";
import { passwordResetSchema } from "@/lib/zodSchemas";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import PasswordField from "../ui/PasswordField";
import AuthForm from "./AuthForm";
import RedirectLink from "../ui/RedirectLink";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState(searchParams.get("token"));

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const [formdata, setFormdata] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = useCallback(
    (key: "password" | "confirmPassword") => {
      setShowPassword((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    },
    []
  );

  const handleChange = useCallback(
    (key: "password" | "confirmPassword", value: string) => {
      setFormdata((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formdata.password !== formdata.confirmPassword) {
      // toast.error("Password and confirm password do not match");
      setError("Password and confirm password do not match");
      return;
    }
    const data = { password: formdata.password, token };
    const validationResult = passwordResetSchema.safeParse(data);
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      await api.post("/reset-password", data);
      // toast.success("Password updated successfully");
      setDone(true);
    } catch (err: unknown) {
      console.error(err);
      // @ts-ignore
      if (err && err?.response) {
        // setError("Token is not valid or expired. regenrate it");
        setToken("");
        setError("");
        setDone(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      formTitle="Reset Password"
      buttonLabel="Reset Password"
      loading={loading}
      onClick={handleReset}
      submitted={done}
    >
      {done && token && (
        <Stack spacing={2}>
          <Typography color="success.main">
            Password updated successfully!
          </Typography>
          <RedirectLink href="/">Go to Login</RedirectLink>
        </Stack>
      )}
      {!done && token && (
        <Stack spacing={2}>
          <PasswordField
            label="New Password"
            value={formdata.password}
            showPassword={showPassword.password}
            setShowPassword={() => togglePasswordVisibility("password")}
            handleChange={(e) => handleChange("password", e.target.value)}
          />

          <PasswordField
            label="Confirm Password"
            value={formdata.confirmPassword}
            showPassword={showPassword.confirmPassword}
            setShowPassword={() => togglePasswordVisibility("confirmPassword")}
            handleChange={(e) =>
              handleChange("confirmPassword", e.target.value)
            }
          />
        </Stack>
      )}
      {done && !token && (
        <Stack spacing={2}>
          <Typography color="error.main">
            Invalid reset password url regenrate it
          </Typography>
          <RedirectLink href="/forgotPassword">
            Go to Forgot Password
          </RedirectLink>
        </Stack>
      )}
    </AuthForm>
  );
}

export default ResetPasswordForm;
