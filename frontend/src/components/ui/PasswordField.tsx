import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

function PasswordField({
  label,
  showPassword,
  handleChange,
  setShowPassword,
  error,
  value,
}: {
  value: string;
  label?: string;
  showPassword: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowPassword: (showPassword: boolean) => void;
  error?: string;
}) {
  return (
    <TextField
      label={label || "Password"}
      type={showPassword ? "text" : "password"}
      variant="outlined"
      onChange={handleChange}
      name="password"
      size="small"
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={!!error}
      helperText={error}
      fullWidth
      sx={{ mb: 2 }}
      required
    />
  );
}

export default PasswordField;
