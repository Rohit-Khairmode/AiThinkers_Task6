import { Button } from "@mui/material";

export type PrimaryButtonProps = {
  label: string;
  onClick?: (() => void) | ((e: React.FormEvent) => Promise<void>);
  style?: React.CSSProperties;
  loading: boolean;
  fullWidth?: boolean;
  className?: string;
  startIcon?: React.ReactNode;
};

function PrimaryButton({
  label,
  onClick,
  style,
  loading,
  fullWidth = true,
  className,
  startIcon,
}: PrimaryButtonProps) {
  return (
    <Button
      onClick={onClick}
      type="submit"
      variant="contained"
      sx={{
        bgcolor: "#ffdd00",
        color: "#444",
        "&:hover": {
          bgcolor: "#e6c700",
        },
        // py: 1.5,
        borderRadius: "20px",
        ...style,
      }}
      fullWidth={fullWidth}
      loading={loading}
      disabled={loading}
      className={className}
      startIcon={startIcon}
    >
      {label}
    </Button>
  );
}

export default PrimaryButton;
