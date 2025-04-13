"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "@/hooks/useForm";
import api from "@/lib/api";
import { userRegistrationSchema } from "@/lib/zodSchemas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import ModalWindow from "../Modal";
import UserPublicDetails from "../UserPublicDetails";
import PasswordField from "../ui/PasswordField";
export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export type UserRegistrationFormData = z.infer<typeof userRegistrationSchema>;

// Create a type for form errors that matches the structure of the form data
export type FormErrors = {
  [K in keyof UserRegistrationFormData]?: string;
};

export default function UserRegistrationForm() {
  // Partial<T> is a utility type that makes all properties of an object type optional.
  const router = useRouter();
  const {
    formData,
    errors,
    handleChange,
    handleSelectChange,
    setErrors,
    handleprofileImageChange,
    profileImagePreview,
    loading,
    setLoading,
  } = useForm();

  const [userName, setUserName] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const validatedData = userRegistrationSchema.parse(formData);
      console.log("Form submitted:", validatedData);
      const res = await api.post("/users/register", validatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUserName(res.data.data.username);
      setErrors({});
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const formattedErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof UserRegistrationFormData;
          formattedErrors[path] = err.message;
        });
        setErrors(formattedErrors);
      } else {
        console.error(
          "An unexpected error occurred:",
          error?.response?.data?.message
        );
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: "32px", justifySelf: "center", width: "75%" }}>
      <Box bgcolor={"white"} padding={"16px"} borderRadius={2}>
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ fontWeight: "bold", mb: 1, color: "#263238" }}
          >
            User Registration
          </Typography>
          <Typography variant="caption" color="text.secondary">
            *Required Fields
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <UserPublicDetails
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            handleSelectChange={handleSelectChange}
          >
            <PasswordField
              value={formData.password || ""}
              showPassword={showPassword}
              handleChange={handleChange}
              setShowPassword={setShowPassword}
              error={errors.password}
            />
            {/* <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              onChange={handleChange}
              name="password"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              sx={{ mb: 2 }}
            /> */}
          </UserPublicDetails>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Preferred mode of Communication
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <RadioGroup
                name="preferredCommunication"
                value={formData.preferredCommunication}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label="Email"
                />
                <FormControlLabel
                  value="phone"
                  control={<Radio />}
                  label="Phone"
                />
                <FormControlLabel
                  value="both"
                  control={<Radio />}
                  label="Both"
                />
              </RadioGroup>
              {errors.preferredCommunication && (
                <FormHelperText error>
                  {errors.preferredCommunication}
                </FormHelperText>
              )}

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    alt="Profile Preview"
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                ) : (
                  "Upload Profile Photo"
                )}
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleprofileImageChange}
                  multiple
                />
              </Button>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#ffdd00",
                color: "black",
                "&:hover": {
                  bgcolor: "#e6c700",
                },
                py: 1.5,
                borderRadius: "20px",
              }}
              fullWidth
            >
              {loading ? "loading..." : "Register"}
            </Button>
          </Box>

          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="body2">
              By registering, you accept to our{" "}
              <Link href="/terms" style={{ color: "#0cbfce" }}>
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" style={{ color: "#0cbfce" }}>
                Privacy Policy
              </Link>
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/" style={{ color: "#0cbfce" }}>
                Login
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
      <ModalWindow
        open={userName !== ""}
        close={() => {
          setUserName("");
          router.replace("/");
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 2, color: "#2e7d32" }}
        >
          🎉 Registration Successful!
        </Typography>

        <Typography variant="body1" sx={{ mb: 1.5 }}>
          Thank you for registering. Here's your username:
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#1976d2",
            wordBreak: "break-word",
            mb: 2,
          }}
        >
          {userName}
        </Typography>

        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          Please remember this for future logins.
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setUserName("");
            router.replace("/");
          }}
          sx={{
            bgcolor: "#ffdd00",
            color: "black",
            fontWeight: 600,
            px: 4,
            py: 1.2,
            borderRadius: "12px",
            "&:hover": {
              bgcolor: "#e6c700",
            },
          }}
        >
          Close
        </Button>
      </ModalWindow>
    </Box>
  );
}
