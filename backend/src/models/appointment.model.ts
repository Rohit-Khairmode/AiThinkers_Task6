import mongoose from "mongoose";

const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  appointmentType: {
    type: String,
    enum: ["online", "in-person"],
    required: true,
  },
  scheduledAt: { type: Date, required: true },
  serviceProvider: { type: String, reuired: true },
  note: { type: String },
});
export const Appointment = mongoose.model("Appointment", appointmentSchema);
