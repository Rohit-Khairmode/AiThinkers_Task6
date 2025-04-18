import { Box } from "@mui/material";
import { styles } from "./auth.styles";

function AuthLayout({
  children,
  imgUrl,
}: {
  children: React.ReactNode;
  imgUrl: string;
}) {
  return (
    <Box className={styles.container}>
      {children}
      <Box
        sx={{
          backgroundImage: `url(${imgUrl})`,
        }}
        className={`${styles.imgBox}  md:block`}
      />
    </Box>
  );
}

export default AuthLayout;
