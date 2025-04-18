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
import AddIcon from "@mui/icons-material/Add";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ListItem,
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
import AppointmentForm from "../appointment/AppointmentForm";
import { styles } from "./Navbar.styles";
import PrimaryButton from "../ui/PrimaryButton";

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
      sx={{ padding: "8px" }}
      className={styles.appBar}
    >
      <Toolbar>
        <Box className={styles.imgBox}>
          <Link href={"/"}>
            <Image
              src="/ai-small-2.webp"
              alt="Company logo"
              width={150}
              height={50}
            />
          </Link>
        </Box>
        {user && (
          <Box className={styles.avatarBox}>
            <PrimaryButton
              fullWidth={false}
              label="Appointment"
              className="text-base hidden md:flex"
              loading={false}
              onClick={() => setOpenAppointmentForm(true)}
              startIcon={<AddIcon />}
            />
            <Box className={styles.avatarBox} onClick={handleClick}>
              <Avatar
                alt="Remy Sharp"
                sx={{ width: 56, height: 56 }}
                src={user?.profileImage || "/profile.webp"}
              />
              <Box
                sx={{
                  ml: 1,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  flexGrow: 1,
                }}
                className={styles.userName}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {user.username}
                </Typography>
                <KeyboardArrowDown />
              </Box>
            </Box>

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
                  setOpenAppointmentForm(true);
                }}
                className=" md:hidden flex"
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                Appointment
              </MenuItem>
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
          </Box>
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
