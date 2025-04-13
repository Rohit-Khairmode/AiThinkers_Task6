import { Button } from "@mui/material";

function PrimaryButton({
  label,
  onClick,
  style,
}: {
  label: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <Button
      onClick={onClick}
      type="submit"
      variant="contained"
      sx={{
        bgcolor: "#ffdd00",
        color: "black",
        "&:hover": {
          bgcolor: "#e6c700",
        },
        // py: 1.5,
        borderRadius: "20px",
        ...style,
      }}
      fullWidth
    >
      {label}
    </Button>
  );
}

export default PrimaryButton;
