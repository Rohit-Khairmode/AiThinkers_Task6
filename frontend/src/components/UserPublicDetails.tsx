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
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <SmallTextInput
          name="firstName"
          label="First Name*"
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />

        <SmallTextInput
          name="lastName"
          label="Last Name*"
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
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

        <SmallTextInput
          name="mobileNumber"
          label="Mobile Number*"
          value={formData.mobileNumber}
          onChange={handleChange}
          error={!!errors.mobileNumber}
          helperText={errors.mobileNumber}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth error={!!errors.gender}>
          <InputLabel id="gender-label">Gender*</InputLabel>
          <Select
            labelId="gender-label"
            name="gender"
            value={formData.gender}
            onChange={handleSelectChange}
            label="Gender*"
            size="small"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
            <MenuItem value="prefer not to say">Prefer not to say</MenuItem>
          </Select>
          {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <SmallTextInput
          name="line1"
          label="Address Line 1*"
          value={formData.line1}
          onChange={handleChange}
          error={!!errors.line1}
          helperText={errors.line1}
        />

        <SmallTextInput
          name="line2"
          label="Address Line 2"
          value={formData.line2}
          onChange={handleChange}
          error={!!errors.line2}
          helperText={errors.line2}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <SmallTextInput
          name="city"
          label="City*"
          value={formData.city}
          onChange={handleChange}
          error={!!errors.city}
          helperText={errors.city}
        />
        <SmallTextInput
          name="state"
          label="state*"
          value={formData.state}
          onChange={handleChange}
          error={!!errors.state}
          helperText={errors.state}
        />

        <SmallTextInput
          name="zip"
          label="ZIP*"
          value={formData.zip}
          onChange={handleChange}
          error={!!errors.zip}
          helperText={errors.zip}
        />
        <SmallTextInput
          name="country"
          label="Country*"
          value={formData.country}
          onChange={handleChange}
          error={!!errors.country}
          helperText={errors.country}
        />
      </Box>

      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <SmallTextInput
          name="email"
          label="Email*"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        {children}
      </Box>
    </>
  );
}
export function SmallTextInput({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  type,
}: {
  name: string;
  label: string;
  value: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  type?: string;
  helperText?: string;
}) {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      size="small"
      sx={{
        "& .MuiInputBase-input::placeholder": {
          color: "#90A4AE", // muted gray
          opacity: 1, // required to override default MUI styles
        },
      }}
      type={type}
      fullWidth
    />
  );
}
export default UserPublicDetails;
