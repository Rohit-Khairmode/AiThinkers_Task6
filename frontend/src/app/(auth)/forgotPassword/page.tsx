"use client";
import api from "@/lib/api";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [username, setusername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/forgot-password", { username });
      setSubmitted(true);
      toast.success("Check your email for the reset link.");
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
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        padding: "20px",
        backgroundColor: "whitesmoke",
        borderRadius: "15px",
      }}
    >
      <Typography variant="h5">Forgot Password</Typography>
      {submitted ? (
        <Typography>Check your email for the reset link.</Typography>
      ) : (
        <>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            fullWidth
          >
            {loading ? "Sending reset link..." : "Send Reset Link"}
          </Button>
        </>
      )}
    </Box>
  );
}
