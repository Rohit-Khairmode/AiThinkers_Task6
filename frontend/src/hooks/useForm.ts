import {
  FormErrors,
  UserRegistrationFormData,
} from "@/components/auth/RegistrationForm";
import api from "@/lib/api";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/store/auth/authSlice";
import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export function useForm() {
  const [formData, setFormData] = useState<Partial<UserRegistrationFormData>>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    mobileNumber: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
    password: "",
    // preferredCommunication: "",
    termsAccepted: true,
  });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [profileImagePreview, setprofileImagePreview] = useState<string | null>(
    null
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear the error for this field when the user changes it
      if (errors[name as keyof UserRegistrationFormData]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name as keyof UserRegistrationFormData];
          return newErrors;
        });
      }
    }
  };
  const handleSelectChange = (e: SelectChangeEvent<string>): void => {
    const { name, value } = e.target;

    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear the error for this field
      if (errors[name as keyof UserRegistrationFormData]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name as keyof UserRegistrationFormData];
          return newErrors;
        });
      }
    }
  };
  const handleprofileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));

      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        setprofileImagePreview(reader.result as string);
      };

      if (errors.profileImage) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.profileImage;
          return newErrors;
        });
      }
    }
  };
  async function handleProfileImageUpload() {
    setLoading(true);
    try {
      const curData = new FormData();
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

  return {
    formData,
    setFormData,
    loading,
    setLoading,
    errors,
    setErrors,
    handleChange,
    handleSelectChange,
    profileImagePreview,
    handleprofileImageChange,
    handleProfileImageUpload,
  };
}
