import { Request, RequestHandler, Response } from "express";
import { Appointment } from "../models/appointment.model"; // Adjust path accordingly
import {
  appointmentSchema,
  updateAppointmentSchema,
} from "../utils/zodSchemas";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const createAppointment: RequestHandler = asyncHandler(
  async (req: Request, res) => {
    const validationResult = appointmentSchema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessages = Object.fromEntries(
        validationResult.error.errors.map((error) => [
          error.path[0],
          error.message,
        ])
      );
      throw new ApiError(400, "Validation error", errorMessages);
    }

    const data = validationResult.data;
    const appointment = await Appointment.create({
      ...data,
      userId: req.user?.id,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, appointment, "Appointment created successfully")
      );
  }
);

export const getAppointments: RequestHandler = asyncHandler(
  async (req: Request, res) => {
    const appointments = await Appointment.find({ userId: req.user?.id });

    return res
      .status(200)
      .json(
        new ApiResponse(200, appointments, "Appointments fetched successfully")
      );
  }
);

export const getAppointmentById: RequestHandler = asyncHandler(
  async (req: Request, res) => {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      userId: req.user?.id,
    });

    if (!appointment) {
      throw new ApiError(404, "Appointment not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, appointment, "Appointment fetched successfully")
      );
  }
);

export const updateAppointment: RequestHandler = asyncHandler(
  async (req: Request, res) => {
    const validationResult = updateAppointmentSchema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessages = Object.fromEntries(
        validationResult.error.errors.map((error) => [
          error.path[0],
          error.message,
        ])
      );
      throw new ApiError(400, "Validation error", errorMessages);
    }

    const updated = await Appointment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      validationResult.data,
      { new: true }
    );

    if (!updated) {
      throw new ApiError(404, "Appointment not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Appointment updated successfully"));
  }
);

export const deleteAppointment: RequestHandler = asyncHandler(
  async (req: Request, res) => {
    const deleted = await Appointment.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.id,
    });

    if (!deleted) {
      throw new ApiError(404, "Appointment not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Appointment deleted successfully"));
  }
);
