import { Stack, Typography, Button } from "@mui/material";

const DeleteAppointmentConfirm = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Stack spacing={3}>
      <Typography variant="h6" color="error">
        Confirm Delete
      </Typography>
      <Typography>
        Are you sure you want to delete this appointment? This action cannot be
        undone.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};

export default DeleteAppointmentConfirm;
