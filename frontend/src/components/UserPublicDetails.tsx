import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent } from "react";
import { FormErrors, UserRegistrationFormData } from "./auth/RegistrationForm";
import { CustomTextInput } from "./ui/CustomTextInput";
import CustomSelect from "./ui/CustomSelect";
import { styles } from "./auth/auth.styles";

const genderOptions = [
  { value: "male", title: "Male" },
  { value: "female", title: "Female" },
  { value: "other", title: "Other" },
  { value: "prefer not to say", title: "Prefer not to say" },
];

function UserPublicDetails({
  formData,
  errors,
  handleChange,
  handleSelectChange,
  children,
}: {
  formData: Partial<UserRegistrationFormData>;
  errors: FormErrors;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: SelectChangeEvent<string>) => void;
  children?: React.ReactNode;
}) {
  return (
    <>
      <FieldsContainer>
        <CustomTextInput
          name="firstName"
          label="First Name*"
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />

        <CustomTextInput
          name="lastName"
          label="Last Name*"
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </FieldsContainer>

      <FieldsContainer>
        <TextField
          name="dateOfBirth"
          label="Date of Birth*"
          type="date"
          value={
            formData.dateOfBirth
              ? new Date(formData.dateOfBirth).toISOString().split("T")[0]
              : ""
          }
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!errors.dateOfBirth}
          helperText={errors.dateOfBirth}
          size="small"
          fullWidth
        />

        <CustomTextInput
          name="mobileNumber"
          label="Mobile Number*"
          value={formData.mobileNumber}
          onChange={handleChange}
          error={!!errors.mobileNumber}
          helperText={errors.mobileNumber}
        />
      </FieldsContainer>

      <Box sx={{ mb: 1 }}>
        <CustomSelect
          options={genderOptions}
          name="gender"
          value={formData.gender || ""}
          handleSelectChange={(e: SelectChangeEvent<string>) =>
            handleSelectChange(e)
          }
          error={errors.gender}
        />
      </Box>

      <FieldsContainer>
        <CustomTextInput
          name="line1"
          label="Address Line 1*"
          value={formData.line1}
          onChange={handleChange}
          error={!!errors.line1}
          helperText={errors.line1}
        />

        <CustomTextInput
          name="line2"
          label="Address Line 2"
          value={formData.line2}
          onChange={handleChange}
          error={!!errors.line2}
          helperText={errors.line2}
        />
        <CustomTextInput
          name="city"
          label="City*"
          value={formData.city}
          onChange={handleChange}
          error={!!errors.city}
          helperText={errors.city}
        />
      </FieldsContainer>

      <FieldsContainer>
        <CustomTextInput
          name="state"
          label="state*"
          value={formData.state}
          onChange={handleChange}
          error={!!errors.state}
          helperText={errors.state}
        />

        <CustomTextInput
          name="zip"
          label="ZIP*"
          value={formData.zip}
          onChange={handleChange}
          error={!!errors.zip}
          helperText={errors.zip}
        />
        <CustomTextInput
          name="country"
          label="Country*"
          value={formData.country}
          onChange={handleChange}
          error={!!errors.country}
          helperText={errors.country}
        />
      </FieldsContainer>

      <FieldsContainer>
        <CustomTextInput
          name="email"
          label="Email*"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        {children}
      </FieldsContainer>
    </>
  );
}

export default UserPublicDetails;

export const FieldsContainer = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box className={styles.registetrFieldsContainer}>{children}</Box>;
};
