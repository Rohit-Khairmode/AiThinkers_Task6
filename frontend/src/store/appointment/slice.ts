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
export type errorObj = {
  addAppointment: string;
  updateAppointment: string;
  deleteAppointment: string;
  fetchAppointments: string;
};
interface State {
  list: Appointment[];
  error: errorObj;
}

const initialState: State = {
  list: [],
  error: {
    addAppointment: "",
    updateAppointment: "",
    deleteAppointment: "",
    fetchAppointments: "",
  },
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    fetchAppointmentsRequest: () => {},
    errorfetchAppointments: (state) => {
      state.error.fetchAppointments = "error while fetching appointment";
    },
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.error.fetchAppointments = "";
      state.list = action.payload;
    },

    addAppointment: (
      _state,
      _action: PayloadAction<Omit<Appointment, "_id">>
    ) => {},
    errorAddAppointment: (state) => {
      state.error.addAppointment = "error while inserting new appointment";
    },
    updateAppointment: (_state, _action: PayloadAction<Appointment>) => {},
    errorUpdateAppointment: (state) => {
      state.error.updateAppointment = "Error while updating appointment";
    },
    deleteAppointment: (_state, _action: PayloadAction<string>) => {},
    errorDeleteAppointment: (state) => {
      state.error.deleteAppointment = "Error while deleting appointment";
    },
    /* We define two separate action creators for deleting an appointment:
      1. `deleteAppointment` – used only to trigger the saga (no state change here)
      2. `appointmentDeleted` – used by the saga to update the Redux store after a successful API call

      Why?
      - When we dispatch `deleteAppointment` from a component, it always reaches both:
          a) the saga (to perform the async API call)
          b) the reducer (if we had state changes in it)

      - If we directly modify the state inside `deleteAppointment`, the state would change 
        immediately, even if the API call in the saga later fails — causing inconsistent state.

      - To avoid this, we keep `deleteAppointment` as a trigger only (no reducer logic), and
        only dispatch `appointmentDeleted` from the saga after a successful API call.

      - This ensures that the Redux state is only updated when the backend confirms success.
    */
    // below action we will only trigger from saga updates
    appointmentDeleted: (state, action: PayloadAction<string>) => {
      state.error.deleteAppointment = "";
      state.list = state.list.filter((a) => a._id !== action.payload);
    },
    appointmentAdded: (state, action: PayloadAction<Appointment>) => {
      state.error.addAppointment = "";
      state.list.push(action.payload);
    },
    appointmentUpdated: (state, action: PayloadAction<Appointment>) => {
      state.error.updateAppointment = "";
      const index = state.list.findIndex((a) => a._id === action.payload._id);
      if (index !== -1) state.list[index] = action.payload;
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
  errorfetchAppointments,
  errorAddAppointment,
  errorDeleteAppointment,
  errorUpdateAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
