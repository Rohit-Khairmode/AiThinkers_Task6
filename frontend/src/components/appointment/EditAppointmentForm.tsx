import { TextField, MenuItem, Stack, Button, Typography } from "@mui/material";
import { Appointment } from "@/lib/zodSchemas";
import React, { useState } from "react";

const appointmentTypes = ["online", "in-person"];

const EditAppointmentForm = ({
  appointment,
  onSave,
  onCancel,
}: {
  appointment: Appointment;
  onSave: (updated: Appointment) => void;
  onCancel: () => void;
}) => {
  const [form, setForm] = useState({ ...appointment });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Edit Appointment</Typography>

      <TextField
        name="serviceType"
        label="Service Type"
        value={form.serviceType}
        onChange={handleChange}
      />

      <TextField
        name="appointmentType"
        label="Appointment Type"
        select
        value={form.appointmentType}
        onChange={handleChange}
      >
        {appointmentTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="serviceProvider"
        label="Service Provider"
        value={form.serviceProvider}
        onChange={handleChange}
      />

      <TextField
        name="note"
        label="Note"
        value={form.note}
        onChange={handleChange}
      />

      <TextField
        name="scheduledAt"
        label="Scheduled At"
        type="datetime-local"
        value={form.scheduledAt.slice(0, 16)} // ISO → input-compatible
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditAppointmentForm;
