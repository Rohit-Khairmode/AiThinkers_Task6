"use client";
import { RootState } from "@/store";
import { getNextUpcomingAppointment } from "@/store/appointment/slice";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const LatestAppointmentCard = () => {
  const list = useSelector((state: RootState) => state.appointment.list);
  const appointment = getNextUpcomingAppointment(list);

  if (!appointment) {
    return (
      <Card variant="outlined" sx={{ borderRadius: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h6">No Upcoming Appointments</Typography>
          <Typography variant="body2" color="text.secondary">
            You are all caught up!
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const { serviceType, serviceProvider, scheduledAt, appointmentType, note } =
    appointment;

  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 2,
        boxShadow: 3,
        background: "#f9f9f9",
        minWidth: 300,
      }}
    >
      <CardContent>
        <Stack spacing={1} direction={"row"}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PersonIcon fontSize="small" />
            <Typography>{serviceProvider}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <PlaceIcon fontSize="small" />
            <Chip label={appointmentType} size="small" color="primary" />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <EventIcon fontSize="small" />
            <Typography>
              {new Date(scheduledAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontWeight={500}>Service:</Typography>
            <Typography>{serviceType}</Typography>
          </Stack>

          {note && (
            <Typography variant="body1" textAlign={"start"}>
              Details: {note}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LatestAppointmentCard;
