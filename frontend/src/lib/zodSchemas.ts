import { z } from "zod";
export const passwordResetSchema = z.object({
  token: z.string().min(1, {
    message: "Token is required. Genrate from forgot password page",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be minimum 8 characters long" })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Must have 1 capital letter",
    })
    .refine((val) => /[!@#$%^&*]/.test(val), {
      message: "Must contain 1 special character",
    }),
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
    .min(8, { message: "Password must be minimum 8 characters long" })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Must have 1 capital letter",
    })
    .refine((val) => /[!@#$%^&*]/.test(val), {
      message: "Must contain 1 special character",
    }),
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
export const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "Only image files are allowed",
  })
  .refine((file) => file.size <= 3 * 1024 * 1024, {
    message: "Image must be smaller than 3MB",
  });
