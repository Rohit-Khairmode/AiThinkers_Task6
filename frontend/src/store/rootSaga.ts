// store/sagas/rootSaga.ts
import { all, fork } from "redux-saga/effects";
import appointmentSaga from "@/store/appointment/saga";

export default function* rootSaga() {
  yield all([fork(appointmentSaga)]);
}
