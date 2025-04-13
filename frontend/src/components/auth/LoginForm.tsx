"use client";
import api from "@/lib/api";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/auth/authSlice";

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
    try {
      const response = await api.post("/users/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Login successful");
      console.log("Login response:", response.data.data);
      dispatch(setUser(response.data.data));
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error during login:", error);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      width={350}
      p={4}
      borderRadius={2}
      boxShadow={3}
      bgcolor="#fff"
      display="flex"
      flexDirection="column"
      gap={2}
      justifySelf="center"
    >
      <Typography variant="h5" fontWeight="bold">
        Patient Login
      </Typography>
      <Typography fontSize={14} color="#f00">
        {error}
      </Typography>

      <TextField
        label="Username*"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Password*"
        type={showPassword ? "text" : "password"}
        fullWidth
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box display="flex" justifyContent="flex-end">
        <Link href="/forgotPassword" underline="hover" fontSize={14}>
          Forgot Password?
        </Link>
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#ffdd00",
          color: "black",
          borderRadius: 10,
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#e6c700",
          },
        }}
        onClick={handleLogin}
      >
        {loading ? "loading..." : "Login"}
      </Button>

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
        onClick={() => router.push("/register")}
      >
        Create Account
      </Button>
    </Box>
  );
}
