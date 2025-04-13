import {
  FormErrors,
  UserRegistrationFormData,
} from "@/components/auth/RegistrationForm";
import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";

export function useForm() {
  const [formData, setFormData] = useState<Partial<UserRegistrationFormData>>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    mobileNumber: "",
    gender: "prefer not to say",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
    password: "",
    preferredCommunication: "email",
    termsAccepted: true,
  });
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
  };
}
