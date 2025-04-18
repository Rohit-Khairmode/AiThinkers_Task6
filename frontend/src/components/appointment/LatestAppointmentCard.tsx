"use client";
import { styles } from "@/app/dashboard/dashboard.styles";
import { RootState } from "@/store";
import { getNextUpcomingAppointment } from "@/store/appointment/slice";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
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
    <Card className={styles.contentCard}>
      <CardContent>
        <Stack className={styles.contentLayout}>
          <Box className={styles.serviceProviderBox}>
            <IconTextBox text={serviceProvider}>
              <PersonIcon className={styles.icon} />
            </IconTextBox>

            <IconTextBox>
              <PlaceIcon className={styles.icon} />
              <Chip
                className={styles.iconText}
                label={appointmentType}
                size="medium"
                color="primary"
              />
            </IconTextBox>

            <IconTextBox
              text={new Date(scheduledAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            >
              <EventIcon fontSize="small" />
            </IconTextBox>
          </Box>
          <Box className={` flex gap-2 flex-wrap justify-center`}>
            <IconTextBox text={serviceType}>
              <Typography fontWeight={700} className={styles.iconText}>
                Service:
              </Typography>
            </IconTextBox>

            {note && (
              <Typography variant="body1" textAlign={"start"}>
                <span className={`font-bold ${styles.iconText}`}>Details:</span>
                <span className={styles.iconText}>{note}</span>
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LatestAppointmentCard;
function IconTextBox({
  children,
  text,
}: {
  children: React.ReactNode;
  text?: string;
}) {
  return (
    <Stack className={styles.iconTextBox}>
      {children}
      <Typography className={styles.iconText}>{text}</Typography>
    </Stack>
  );
}
