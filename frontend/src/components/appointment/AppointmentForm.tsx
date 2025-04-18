// components/AppointmentFormModal.tsx
import ModalWindow from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { AppointmentFormData } from "@/lib/zodSchemas";
import { addAppointment, updateAppointment } from "@/store/appointment/slice";
import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {
  open: boolean;
  close: (val: boolean) => void;
  defaultData?: AppointmentFormData | null;
};

const defaultFormData: AppointmentFormData = {
  serviceType: "",
  appointmentType: "online",
  scheduledAt: "",
  serviceProvider: "",
  note: "",
};

const AppointmentFormModal = ({ open, close, defaultData }: Props) => {
  const [formData, setFormData] =
    useState<AppointmentFormData>(defaultFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof AppointmentFormData, string>>
  >({});
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.appointment.error);

  useEffect(() => {
    if (defaultData) {
      setFormData(defaultData);
    } else {
      setFormData(defaultFormData);
    }
  }, [defaultData]);

  const handleChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleSubmit = (data: AppointmentFormData) => {
    if (typeof data._id === "string") {
      const updatedData = { ...data, _id: data._id };
      dispatch(updateAppointment(updatedData));
      if (error.updateAppointment) toast.error(error.updateAppointment);
      else toast.success("Appointment updated successfully");
    } else {
      const { _id, ...newData } = data;
      dispatch(addAppointment({ ...newData }));
      if (error.addAppointment) toast.error(error.addAppointment);
      else toast.success("Appointment added successfully");
    }
    close(false);
    setFormData(defaultFormData);
  };

  return (
    <ModalWindow
      open={open}
      close={() => {
        setFormData(defaultFormData);
        close(false);
      }}
    >
      <Typography variant="h6" mb={2}>
        {formData._id ? "Update Appointment" : "Create Appointment"}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Service Type"
          value={formData.serviceType}
          onChange={(e) => handleChange("serviceType", e.target.value)}
          error={!!errors.serviceType}
          helperText={errors.serviceType}
        />
        <TextField
          select
          label="Appointment Type"
          value={formData.appointmentType}
          onChange={(e) => handleChange("appointmentType", e.target.value)}
        >
          <MenuItem value="online">Online</MenuItem>
          <MenuItem value="in-person">In Person</MenuItem>
        </TextField>
        <TextField
          label="Scheduled At"
          type="datetime-local"
          value={formData.scheduledAt}
          onChange={(e) => handleChange("scheduledAt", e.target.value)}
          InputLabelProps={{ shrink: true }}
          error={!!errors.scheduledAt}
          helperText={errors.scheduledAt}
        />
        <TextField
          label="Service Provider"
          value={formData.serviceProvider}
          onChange={(e) => handleChange("serviceProvider", e.target.value)}
          error={!!errors.serviceProvider}
          helperText={errors.serviceProvider}
        />
        <TextField
          label="Note"
          value={formData.note || ""}
          onChange={(e) => handleChange("note", e.target.value)}
        />
        <Button variant="contained" onClick={() => handleSubmit(formData)}>
          {formData._id ? "Update" : "Create"}
        </Button>
      </Stack>
    </ModalWindow>
  );
};

export default AppointmentFormModal;
