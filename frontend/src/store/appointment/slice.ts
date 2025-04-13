// store/slices/appointmentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Appointment {
  _id: string;
  serviceType: string;
  appointmentType: "online" | "in-person";
  scheduledAt: string;
  serviceProvider: string;
  note?: string;
}

interface State {
  list: Appointment[];
}

const initialState: State = {
  list: [],
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    fetchAppointmentsRequest: () => {},
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.list = action.payload;
    },

    addAppointment: (
      _state,
      _action: PayloadAction<Omit<Appointment, "_id">>
    ) => {},
    updateAppointment: (_state, _action: PayloadAction<Appointment>) => {},
    deleteAppointment: (_state, _action: PayloadAction<string>) => {},

    // Optimistic updates (optional)
    appointmentAdded: (state, action: PayloadAction<Appointment>) => {
      state.list.push(action.payload);
    },
    appointmentUpdated: (state, action: PayloadAction<Appointment>) => {
      const index = state.list.findIndex((a) => a._id === action.payload._id);
      if (index !== -1) state.list[index] = action.payload;
    },
    appointmentDeleted: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((a) => a._id !== action.payload);
    },
  },
});
export function getNextUpcomingAppointment(
  appointments: Appointment[]
): Appointment | null {
  const now = new Date();

  const upcoming = appointments
    .filter((a) => new Date(a.scheduledAt) > now)
    .sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    );

  return upcoming[0] || null;
}
export const {
  fetchAppointmentsRequest,
  setAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  appointmentAdded,
  appointmentUpdated,
  appointmentDeleted,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
