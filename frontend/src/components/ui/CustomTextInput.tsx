import { Theme } from "@emotion/react";
import { SxProps, TextField } from "@mui/material";
import { ChangeEvent, JSX } from "react";

/* CustomTextInput */
interface CustomTextInputProps {
  name: string;
  label: string;
  value: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  type?: string;
  helperText?: string;
  size?: "small" | "medium";
  InputProps?: {
    endAdornment: JSX.Element;
  };
  sx?: SxProps<Theme>;
}
export function CustomTextInput({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  type,
  size = "small",
  InputProps,
  sx,
}: CustomTextInputProps) {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      size={size}
      sx={{
        "& .MuiInputBase-input::placeholder": {
          color: "#90A4AE", // muted gray
          opacity: 1, // required to override default MUI styles
        },
        ...sx,
      }}
      type={type}
      fullWidth
      InputProps={{ ...InputProps }}
    />
  );
}
