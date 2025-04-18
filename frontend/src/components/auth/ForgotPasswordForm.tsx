"use client";
import api from "@/lib/api";
import { Typography } from "@mui/material";
import { useState } from "react";
import { CustomTextInput } from "../ui/CustomTextInput";
import AuthForm from "./AuthForm";

function ForgotPasswordForm() {
  const [username, setusername] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError("username is required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/forgot-password", { username });
      setSubmitted(true);
      setError("");
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthForm
      formTitle="Forgot Password"
      buttonLabel="Send Reset Link"
      loading={loading}
      onClick={handleSubmit}
      submitted={submitted}
    >
      {submitted ? (
        <Typography>Check your email for the reset link.</Typography>
      ) : (
        <CustomTextInput
          name="username"
          label="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
      )}
    </AuthForm>
  );
}

export default ForgotPasswordForm;
