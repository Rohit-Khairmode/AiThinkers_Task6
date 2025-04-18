"use client";
import { VisuallyHiddenInput } from "@/components/auth/RegistrationForm";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ProfilePageSkeleton from "@/components/ui/ProfilePageSkeleton";
import UserPublicDetails from "@/components/UserPublicDetails";
import { useForm } from "@/hooks/useForm";
import api from "@/lib/api";
import { useAppDispatch } from "@/lib/hooks";
import { imageFileSchema } from "@/lib/zodSchemas";
import { RootState } from "@/store";
import { setUser } from "@/store/auth/authSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { styles } from "./profile.styles";
import { useSelector } from "react-redux";
import RadioButtonGroup from "@/components/ui/RadioButtonGroup";
import { preferredCommunicationOptions } from "@/lib/constant";

function ProfilePage() {
  const { user, isloading } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const {
    formData,
    errors,
    handleChange,
    handleSelectChange,
    profileImagePreview,
    loading,
    setLoading,
    setFormData,
  } = useForm();
  const [imageLoading, setImageLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      e.preventDefault();
      const res = await api.put("/users/update", formData);
      toast.success("Profile updated successfully");
      dispatch(setUser({ ...res.data.data, profileImage: user?.profileImage }));
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }
  async function handleProfileImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    const result = imageFileSchema.safeParse(file);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    setImageLoading(true);
    try {
      const res = await api.put(
        "/users/update/profile-image",
        { profileImage: file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile image updated successfully");
      dispatch(
        setUser({ ...res.data.data, profileImage: res.data.data.profileImage })
      );
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error("Failed to update profile image");
    } finally {
      setImageLoading(false);
    }
  }
  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);
  if (isloading) return <ProfilePageSkeleton />;
  if (!user)
    return (
      <Typography>
        User not found! Try to <Link href="/">login again</Link>
      </Typography>
    );

  return (
    <>
      <Box className={styles.bannerBox}>
        <Typography variant="h4" color="white">
          User Details
        </Typography>
      </Box>
      <Box className={styles.contentBox}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className={styles.profileDetailsForm}
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
                <RadioButtonGroup
                  options={preferredCommunicationOptions}
                  checkedOption={formData.preferredCommunication || ""}
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
                loading={loading}
                label={loading ? "Updating..." : "Update Profile"}
              />
            </Box>
          </Paper>
        </Box>

        <Box className={"md:mx-auto"}>
          <Paper elevation={3} className={styles.profileImageBox}>
            <Typography variant="h6" gutterBottom>
              Profile Picture
            </Typography>
            <Avatar
              alt="Remy Sharp"
              className={styles.profileImage}
              src={profileImagePreview || user.profileImage || "/profile.webp"}
            />

            <Box>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ mt: 2 }}
                loading={imageLoading}
                disabled={imageLoading}
              >
                Change Photo
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleProfileImageUpload}
                  accept="image/*"
                />
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default ProfilePage;
