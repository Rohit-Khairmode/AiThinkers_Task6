"use client";
import api from "@/lib/api";
import { RootState } from "@/store";
import { logout } from "@/store/auth/authSlice";
import {
  AccountCircle,
  Dashboard,
  ExitToApp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import AppointmentForm from "./appointment/AppointmentForm";

function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [openAppointmentForm, setOpenAppointmentForm] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
      dispatch(logout());
      toast.success("Logout successful");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
    handleClose();
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ backgroundColor: "white" }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Link href={"/"}>
            <Image
              src="./logo.svg"
              alt="Clarkson Eyecare"
              width={150}
              height={50}
            />
          </Link>
        </Box>
        {user && (
          <>
            <Button
              variant="contained"
              sx={{
                borderRadius: 28,
                px: 3,
                backgroundColor: "#FFD700",
                color: "black",
                "&:hover": {
                  backgroundColor: "#E6C200",
                },
              }}
              onClick={() => setOpenAppointmentForm(true)}
            >
              Insert Appointment
            </Button>
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <Image
                src={user?.profileImage || "/profile.webp"}
                alt="user avatar"
                width={50}
                height={50}
                style={{
                  borderRadius: "50%",
                }}
                onClick={handleClick}
              />
              <Box
                sx={{
                  ml: 1,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  flexGrow: 1,
                }}
                onClick={handleClick}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {user.username}
                </Typography>
                <KeyboardArrowDown />
              </Box>
            </Box>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  router.push("/dashboard/profile");
                }}
              >
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  router.push("/dashboard");
                }}
              >
                <ListItemIcon>
                  <Dashboard fontSize="small" />
                </ListItemIcon>
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToApp fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
      {user && (
        <AppointmentForm
          open={openAppointmentForm}
          close={setOpenAppointmentForm}
          defaultData={null}
        />
      )}
    </AppBar>
  );
}

export default Navbar;
