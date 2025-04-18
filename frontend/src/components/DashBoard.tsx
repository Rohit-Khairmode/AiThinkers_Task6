"use client";

import { RootState } from "@/store";
import { getNextUpcomingAppointment } from "@/store/appointment/slice";
import { ArrowForward, Event, KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import type React from "react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { z } from "zod";
import AppointmentsList from "./appointment/AppointmetList";
import LatestAppointmentCard from "./appointment/LatestAppointmentCard";
import { styles } from "@/app/dashboard/dashboard.styles";

// Define the schema for appointment data
const AppointmentSchema = z.object({
  type: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
});

const tabs = ["Dashboard", "Appointments"];

export default function Dashboard() {
  const [tabValue, setTabValue] = useState(0);
  const user = useSelector((state: RootState) => state?.auth?.user);
  const list = useSelector((state: RootState) => state.appointment.list);
  const latestAppointments = useMemo(
    () => getNextUpcomingAppointment(list),
    [list]
  );

  return (
    <>
      <Box className={styles.tabsBox}>
        <Tabs
          value={tabValue}
          aria-label="navigation tabs"
          sx={{
            "& .MuiTab-root": { textTransform: "none" },
          }}
        >
          {tabs.map((cur, i) => {
            return (
              <Tab
                key={i}
                onClick={() => setTabValue(i)}
                label={cur}
                sx={{ fontWeight: "bold" }}
              />
            );
          })}
        </Tabs>
      </Box>

      <Box className={styles.bannerBox}>
        <Typography className={styles.bannerText}>
          Hi, {user?.firstName} {user?.lastName},
          {tabValue === 0
            ? "Welcome to your dashboard"
            : "Check all your appointments"}
        </Typography>
      </Box>

      <Container sx={{ mt: 4 }}>
        {tabValue === 0 && (
          <Paper className={styles.elevatedBox}>
            <Box className={styles.contentTitle}>
              <Event sx={{ color: "#00BCD4", mr: 1 }} />
              <Typography variant="h6">Latest Appointment</Typography>
            </Box>
            <Box>
              {latestAppointments ? (
                <LatestAppointmentCard />
              ) : (
                <>
                  <Typography variant="h6">No upcoming appointments</Typography>
                </>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button
                endIcon={<ArrowForward />}
                sx={{
                  color: "#00BCD4",
                  textTransform: "none",
                  fontWeight: 700,
                  ":hover": {
                    backgroundColor: "#fff",
                  },
                }}
                onClick={() => {
                  setTabValue(1);
                }}
              >
                View All Appointments
              </Button>
            </Box>
          </Paper>
        )}
        {tabValue === 1 && (
          <Paper className={styles.elevatedBox}>
            <Box className={styles.contentTitle}>
              <Event sx={{ color: "#00BCD4", mr: 1 }} />
              <Typography variant="h6">Appointments List</Typography>
            </Box>
            <AppointmentsList />
          </Paper>
        )}
      </Container>
    </>
  );
}
