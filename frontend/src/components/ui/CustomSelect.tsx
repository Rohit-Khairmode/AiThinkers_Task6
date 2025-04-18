import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface CustomSelectProps {
  options: { value: string; title: string }[];
  error?: string;
  handleSelectChange: (e: SelectChangeEvent<string>) => void;
  value: string;
  name: string;
}
function CustomSelect({
  options,
  error,
  handleSelectChange,
  value,
  name,
}: CustomSelectProps) {
  return (
    <>
      <FormControl fullWidth error={!!error}>
        <InputLabel id={`${name}-label`} sx={{ mb: 4 }}>
          {name}*
        </InputLabel>
        <Select
          labelId={`${name}-label`}
          name={name}
          value={value}
          onChange={handleSelectChange}
          label={name}
          size="small"
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>}
    </>
  );
}

export default CustomSelect;
