import { Box, Button, Typography } from "@mui/material";
import { styles } from "./auth.styles";
import PrimaryButton from "../ui/PrimaryButton";

export type AuthFormProps = {
  formTitle: string;
  buttonLabel: string;
  loading: boolean;
  onClick: (e: React.FormEvent) => Promise<void>;
  children: React.ReactNode;
  Footer?: React.ReactNode;
  submitted?: boolean;
  error?: string;
};

function AuthForm({
  formTitle,
  loading,
  buttonLabel,
  onClick,
  children,
  Footer,
  submitted,
  error,
}: AuthFormProps) {
  return (
    <Box className={styles.authForm}>
      <Typography className={styles.authFormTitle} variant="h5">
        {formTitle}
      </Typography>
      <Typography fontSize={14} color="#f00">
        {error}
      </Typography>
      {children}
      {submitted ? null : (
        <PrimaryButton
          label={buttonLabel}
          onClick={onClick}
          loading={loading}
        />
      )}
      {Footer}
    </Box>
  );
}

export default AuthForm;
