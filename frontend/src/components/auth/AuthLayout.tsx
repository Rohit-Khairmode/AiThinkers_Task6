import { Box } from "@mui/material";

function AuthLayout({
  children,
  imgUrl,
}: {
  children: React.ReactNode;
  imgUrl: string;
}) {
  return (
    <Box
      sx={{
        backgroundColor: "#00BCD4",
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        height: "100vh",
        alignItems: "center",
      }}
    >
      {children}
      <Box
        flex={1}
        sx={{
          backgroundImage: `url(${imgUrl})`, // place the uploaded image in public/
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          minHeight: "100vh",
          borderRadius: "400px 0 0 300px ",
        }}
      />
    </Box>
  );
}

export default AuthLayout;
