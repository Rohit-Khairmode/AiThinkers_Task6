import { Router } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  updateAppointment,
} from "../controllers/appointments.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
export const appointmentsRouter: Router = Router();
appointmentsRouter.use(verifyJWT); //route level middleware
// ("/appointments");
appointmentsRouter.post("/", createAppointment);
appointmentsRouter.delete("/:id", deleteAppointment);
appointmentsRouter.put("/:id", updateAppointment);
appointmentsRouter.get("/", getAppointments);
appointmentsRouter.get("/:id", getAppointmentById);
