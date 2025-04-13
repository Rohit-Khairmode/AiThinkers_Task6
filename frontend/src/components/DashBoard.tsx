"use client";

import type React from "react";
import { useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  TextField,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Select,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
} from "@mui/material";
import {
  KeyboardArrowDown,
  LocationOn,
  Search,
  CalendarMonth,
  Description,
  Event,
  MedicalInformation,
  ArrowForward,
} from "@mui/icons-material";
import Image from "next/image";
import { z } from "zod";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getNextUpcomingAppointment } from "@/store/appointment/slice";
import AppointmentsList, {
  AppointmentItem,
} from "./appointment/AppointmetList";
import LatestAppointmentCard from "./appointment/LatestAppointmentCard";

// Define the schema for appointment data
const AppointmentSchema = z.object({
  type: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
});

type AppointmentType = z.infer<typeof AppointmentSchema>;

export default function Dashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [appointmentType, setAppointmentType] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const list = useSelector((state: RootState) => state.appointment.list);
  const latestAppointments = useMemo(
    () => getNextUpcomingAppointment(list),
    [list]
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAppointmentTypeChange = (event: SelectChangeEvent) => {
    setAppointmentType(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
        }}
      >
        <Tabs
          value={tabValue}
          aria-label="navigation tabs"
          sx={{ "& .MuiTab-root": { textTransform: "none" } }}
        >
          <Tab
            onClick={() => setTabValue(0)}
            label="Dashboard"
            sx={{ fontWeight: "bold" }}
          />
          <Tab
            onClick={() => setTabValue(1)}
            label="Appointments"
            iconPosition="end"
          />
          <Tab
            label="Health Chart"
            icon={<KeyboardArrowDown fontSize="small" />}
            iconPosition="end"
          />
          <Tab label="Pay My Bill" />
          <Tab
            label="Documents"
            icon={<KeyboardArrowDown fontSize="small" />}
            iconPosition="end"
          />
        </Tabs>
      </Box>

      <Box sx={{ backgroundColor: "#00BCD4", py: 4, px: 8 }}>
        <Typography variant="h4" color="white">
          Hi, {user?.firstName} {user?.lastName},{" "}
          {tabValue === 0
            ? "Welcome to your dashboard"
            : "Check all your appointments"}
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {tabValue === 0 && (
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: { xs: "wrap", md: "nowrap" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                flexGrow: 2,
              }}
            >
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Event sx={{ color: "#00BCD4", mr: 1 }} />
                  <Typography variant="h6">Latest Appointment</Typography>
                </Box>
                <Box sx={{ textAlign: "center", py: 2 }}>
                  {latestAppointments ? (
                    <LatestAppointmentCard />
                  ) : (
                    <>
                      <Typography variant="h6">
                        No upcoming appointments
                      </Typography>
                    </>
                  )}
                </Box>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  onClick={() => {
                    setTabValue(1);
                  }}
                >
                  <Button
                    endIcon={<ArrowForward />}
                    sx={{ color: "#00BCD4", textTransform: "none" }}
                  >
                    View All Appointments
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>
        )}
        {tabValue === 1 && (
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Event sx={{ color: "#00BCD4", mr: 1 }} />
              <Typography variant="h6">Appointments List</Typography>
            </Box>
            <AppointmentsList />
          </Paper>
        )}
      </Container>
    </Box>
  );
}
