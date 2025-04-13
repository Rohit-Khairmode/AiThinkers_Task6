// store/sagas/appointmentSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import api from "@/lib/api";
import {
  fetchAppointmentsRequest,
  setAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  appointmentAdded,
  appointmentUpdated,
  appointmentDeleted,
} from "./slice";
import { Appointment } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";

function* handlefetchAppointmentsRequest(): Generator<any, void, any> {
  console.log("handlefetchAppointmentsRequest");
  try {
    const response = yield call(api.get, "/appointments");
    console.log("response", response);
    yield put(setAppointments(response.data.data));
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
  }
}

function* handleAddAppointment(
  action: PayloadAction<Omit<Appointment, "_id">>
): Generator<any, void, any> {
  try {
    console.log("action.payload", action.payload);
    const response = yield call(api.post, "/appointments", action.payload);
    yield put(appointmentAdded(response.data.data));
  } catch (error) {
    console.error("Failed to add appointment:", error);
  }
}

function* handleUpdateAppointment(
  action: PayloadAction<Appointment>
): Generator<any, void, any> {
  try {
    const { _id, ...rest } = action.payload;
    const response = yield call(api.put, `/appointments/${_id}`, rest);
    yield put(appointmentUpdated(response.data.data));
  } catch (error) {
    console.error("Failed to update appointment:", error);
  }
}

function* handleDeleteAppointment(action: PayloadAction<string>) {
  try {
    yield call(api.delete, `/appointments/${action.payload}`);
    yield put(appointmentDeleted(action.payload));
  } catch (error) {
    console.error("Failed to delete appointment:", error);
  }
}

export default function* appointmentSaga() {
  yield takeLatest(
    fetchAppointmentsRequest.type,
    handlefetchAppointmentsRequest
  );
  yield takeLatest(addAppointment.type, handleAddAppointment);
  yield takeLatest(updateAppointment.type, handleUpdateAppointment);
  yield takeLatest(deleteAppointment.type, handleDeleteAppointment);
}
