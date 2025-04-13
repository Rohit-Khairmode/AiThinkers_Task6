"use client";
import PasswordField from "@/components/ui/PasswordField";
import api from "@/lib/api";
import { passwordResetSchema } from "@/lib/zodSchemas";
import {
  Box,
  Button,
  Link,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

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
      toast.error("Password and confirm password do not match");
      return;
    }
    const data = { password: formdata.password, token };
    const validationResult = passwordResetSchema.safeParse(data);
    if (!validationResult.success) {
      toast.error("Validation failed. Check password requirements.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/reset-password", data);
      toast.success("Password updated successfully");
      setDone(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleReset}
      sx={{
        maxWidth: 420,
        mx: "auto",
        px: 4,
        py: 5,
        bgcolor: "#f5f5f5",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" mb={3} textAlign="center">
        Reset Password
      </Typography>

      {done ? (
        <Stack spacing={2} alignItems="center">
          <Typography color="success.main">
            Password updated successfully!
          </Typography>
          <Link href="/" underline="hover">
            Go to Login
          </Link>
        </Stack>
      ) : (
        <Stack spacing={3}>
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            startIcon={
              loading && <CircularProgress size={20} color="inherit" />
            }
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </Stack>
      )}
    </Box>
  );
}
