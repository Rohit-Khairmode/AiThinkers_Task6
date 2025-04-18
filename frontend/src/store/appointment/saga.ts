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
  errorfetchAppointments,
  errorAddAppointment,
  errorDeleteAppointment,
  errorUpdateAppointment,
} from "./slice";
import { Appointment } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";

function* handlefetchAppointmentsRequest(): Generator<any, void, any> {
  try {
    const response = yield call(api.get, "/appointments");
    yield put(setAppointments(response.data.data));
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    yield put(errorfetchAppointments());
  }
}

function* handleAddAppointment(
  action: PayloadAction<Omit<Appointment, "_id">>
): Generator<any, void, any> {
  try {
    const response = yield call(api.post, "/appointments", action.payload);
    yield put(appointmentAdded(response.data.data));
  } catch (error) {
    console.error("Failed to add appointment:", error);
    yield put(errorAddAppointment());
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
    yield put(errorUpdateAppointment());
  }
}

function* handleDeleteAppointment(action: PayloadAction<string>) {
  try {
    yield call(api.delete, `/appointments/${action.payload}`);
    yield put(appointmentDeleted(action.payload));
  } catch (error) {
    console.error("Failed to delete appointment:", error);
    yield put(errorDeleteAppointment());
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
