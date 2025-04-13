"use client";
import { VisuallyHiddenInput } from "@/components/auth/RegistrationForm";
import PrimaryButton from "@/components/ui/PrimaryButton";
import UserPublicDetails from "@/components/UserPublicDetails";
import { useForm } from "@/hooks/useForm";
import api from "@/lib/api";
import { useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/store";
import { setUser } from "@/store/auth/authSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  FormControlLabel,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function ProfilePage() {
  const { user, isloading } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const {
    formData,
    errors,
    handleChange,
    handleSelectChange,
    profileImagePreview,
    handleprofileImageChange,
    loading,
    setLoading,
    setFormData,
  } = useForm();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      e.preventDefault();
      console.log("Form submitted:", formData);
      const res = await api.put("/users/update", formData);
      toast.success("Profile updated successfully");
      console.log("Profile updated successfully:", res.data.data);
      dispatch(setUser({ ...res.data.data, profileImage: user?.profileImage }));
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }
  async function handleProfileImageUpload() {
    setLoading(true);
    try {
      const curData = new FormData();
      console.log("formData", formData.profileImage instanceof File);
      if (formData.profileImage instanceof File) {
        curData.append("profileImage", formData.profileImage);
      } else {
        toast.error("Please select a valid profile image.");
      }
      const res = await api.put(
        "/users/update/profile-image",
        { profileImage: formData.profileImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile image updated successfully");
      console.log("Profile image updated successfully:", res.data.data);
      dispatch(
        setUser({ ...res.data.data, profileImage: res.data.data.profileImage })
      );
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error("Failed to update profile image");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);
  if (isloading) return <Typography>Loading...</Typography>;
  if (!user)
    return (
      <Typography>
        User not found! Try to <Link href="/">login again</Link>
      </Typography>
    );

  return (
    <>
      <Box sx={{ backgroundColor: "#00BCD4", py: 4, px: 8 }}>
        <Typography variant="h4" color="white">
          User Details
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          p: 4,
          justifyContent: "center",
          marginX: "auto",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ flex: 1, maxWidth: 600, mx: "auto" }}
        >
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <UserPublicDetails
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
            />
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Preferred mode of Communication
              </Typography>
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
            </Box>

            <Box sx={{ mb: 3 }}>
              <PrimaryButton
                label={loading ? "Updating..." : "Update Profile"}
              />
            </Box>
          </Paper>
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            minWidth: 300,
            maxWidth: 400,
            mx: "auto",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Profile Picture
            </Typography>
            <Image
              src={profileImagePreview || user.profileImage || "/profile.webp"}
              alt="Profile"
              width={200}
              height={200}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}
            >
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ mt: 2 }}
              >
                Change Photo
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleprofileImageChange}
                  accept="image/*"
                />
              </Button>
              <PrimaryButton
                onClick={handleProfileImageUpload}
                label={loading ? "Uploading..." : "Upload Image"}
                style={{ marginTop: 2, borderRadius: "none" }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default ProfilePage;
