import { z } from "zod";
export const passwordResetSchema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter and one special character"
    ),
});

export const userRegistrationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^(\+\d{1,3}[- ]?)?\d{10,14}$/, "Invalid mobile number format"),
  gender: z.enum(["male", "female", "other", "prefer not to say"], {
    errorMap: () => ({ message: "Invalid gender selection" }),
  }),
  line1: z.string().trim().min(1, "Address line 1 is required"),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(1, "Enter valid city name"),
  state: z.string().trim().min(1, "Enter valid state name"),
  zip: z.string().trim().min(1, "Enter valid ZIP code"),
  country: z.string().trim().min(1, "Enter valid country name"),
  email: z.string().trim().email("Invalid email format"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter and one special character"
    ),
  preferredCommunication: z.enum(["email", "phone", "both"]).default("email"),
  termsAccepted: z.boolean().default(true),
  profileImage: z
    .any()
    .optional()
    .refine(
      (file: unknown) =>
        !file ||
        (file instanceof File &&
          file.size <= 3 * 1024 * 1024 &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            file.type
          )),
      {
        message: "Only image files under 3MB (jpg, png, webp) are allowed",
      }
    ),
});
export const appointmentSchema = z.object({
  _id: z.string().optional(), // for update
  serviceType: z.string().min(1),
  appointmentType: z.enum(["online", "in-person"]),
  scheduledAt: z.string().min(1), // ISO string
  serviceProvider: z.string().min(1),
  note: z.string().optional(),
});
export interface Appointment {
  _id: string;
  serviceType: string;
  appointmentType: "online" | "in-person";
  scheduledAt: string;
  serviceProvider: string;
  note?: string;
}
export type AppointmentFormData = z.infer<typeof appointmentSchema>;
