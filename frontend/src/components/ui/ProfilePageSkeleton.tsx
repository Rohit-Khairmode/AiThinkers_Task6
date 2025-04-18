import { Box, Paper, Skeleton } from "@mui/material";
function ProfilePageSkeleton() {
  return (
    <>
      <Box sx={{ backgroundColor: "#00BCD4", py: 4, px: 8 }}>
        <Skeleton
          variant="text"
          width={200}
          height={40}
          sx={{ bgcolor: "white" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          p: 4,
          justifyContent: "center",
          marginX: "auto",
        }}
      >
        {/* Left Form Skeleton */}
        <Box sx={{ flex: 1, maxWidth: 600, mx: "auto" }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="text" width={200} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={40} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" height={50} />
          </Paper>
        </Box>

        <Box sx={{ flexShrink: 0, minWidth: 300, maxWidth: 400, mx: "auto" }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              textAlign: "center",
            }}
          >
            <Skeleton variant="text" width={120} />
            <Skeleton variant="circular" width={56} height={56} />
            <Skeleton
              variant="rectangular"
              width={150}
              height={36}
              sx={{ mt: 2 }}
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default ProfilePageSkeleton;
