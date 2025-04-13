"use client";
import {
  Appointment,
  deleteAppointment,
  fetchAppointmentsRequest,
  getNextUpcomingAppointment,
  updateAppointment,
} from "@/store/appointment/slice";
import { AppDispatch, RootState } from "@/store/index";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalWindow from "../Modal";
import EditAppointmentForm from "./EditAppointmentForm";
import DeleteAppointmentConfirm from "./DeleteAppointmentConfirm";

const AppointmentsList = () => {
  const dispatch: AppDispatch = useDispatch();
  const list = useSelector((state: RootState) => state.appointment.list);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] =
    useState<Appointment | null>(null);

  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  useEffect(() => {
    if (!list) dispatch(fetchAppointmentsRequest());
    setLoading(false);
  }, [dispatch]);

  const latestAppointments = useMemo(
    () => getNextUpcomingAppointment(list),
    [list]
  );
  const handleEdit = (id: string) => {
    const appointment = list.find((a) => a._id === id);
    if (appointment) {
      setSelectedAppointment(appointment);
      setEditOpen(true);
    }
  };
  const handleSaveEdit = (updated: Appointment) => {
    dispatch(updateAppointment(updated));
    setEditOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancelEdit = () => {
    setEditOpen(false);
    setSelectedAppointment(null);
  };
  const handleDelete = (id: string) => {
    const appointment = list.find((a) => a._id === id);
    if (appointment) {
      setAppointmentToDelete(appointment);
      setDeleteOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (appointmentToDelete) {
      dispatch(deleteAppointment(appointmentToDelete._id));
    }
    setDeleteOpen(false);
    setAppointmentToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteOpen(false);
    setAppointmentToDelete(null);
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr.No</TableCell>
              <TableCell>Service Type</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((appointment, i) => (
              <AppointmentItem
                index={i + 1}
                key={appointment._id}
                appointment={appointment}
                latestAppointments={latestAppointments}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalWindow open={editOpen} close={setEditOpen}>
        {selectedAppointment && (
          <EditAppointmentForm
            appointment={selectedAppointment}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        )}
      </ModalWindow>
      <ModalWindow open={deleteOpen} close={setDeleteOpen}>
        <DeleteAppointmentConfirm
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </ModalWindow>
    </>
  );
};
export const AppointmentItem = ({
  appointment,
  index,
  latestAppointments,
  handleEdit,
  handleDelete,
}: {
  index: number;
  appointment: Appointment;
  latestAppointments: Appointment | null;
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
}) => {
  return (
    <TableRow
      key={appointment._id}
      selected={appointment._id === latestAppointments?._id}
    >
      <TableCell>{index}</TableCell>
      <TableCell>{appointment.serviceType}</TableCell>
      <TableCell>{appointment.serviceProvider}</TableCell>
      <TableCell>{appointment.appointmentType}</TableCell>
      <TableCell>
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            maxWidth: 300,
          }}
        >
          {appointment.note}
        </Typography>
      </TableCell>
      <TableCell>
        {new Date(appointment.scheduledAt).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </TableCell>
      {handleEdit && handleDelete && (
        <TableCell align="right">
          <IconButton onClick={() => handleEdit(appointment._id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(appointment._id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
};
export default AppointmentsList;
