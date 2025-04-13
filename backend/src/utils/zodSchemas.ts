import { z } from "zod";

export const userRegistrationSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1, "First name is required"),
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
  city: z
    .string({ required_error: "City is required" })
    .trim()
    .min(1, "Enter valid city name"),
  state: z
    .string({ required_error: "State is required" })
    .trim()
    .min(1, "enter valid State name"),
  zip: z
    .string({ required_error: "zip code is required" })
    .trim()
    .min(1, "enter valid ZIP code"),
  country: z
    .string({ required_error: "Country name is required" })
    .trim()
    .min(1, "Enter valid Country name"),
  email: z.string().trim().email("Invalid email format"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter and one special character"
    ),
  preferredCommunication: z
    .enum(["email", "phone", "both"], {
      errorMap: () => ({ message: "Invalid communication preference" }),
    })
    .default("email"),
  termsAccepted: z.preprocess((val) => {
    if (typeof val === "string") return val === "true";
    return val;
  }, z.boolean()),
  /*
  Because when we send multipart form data from frontend then all fields will be converted into string boolean also
  */
});
export const publicUserDetailsSchema = userRegistrationSchema
  .omit({
    password: true,
    termsAccepted: true,
  })
  .extend({
    _id: z.string(),
  });

export const appointmentSchema = z.object({
  serviceType: z.string().min(1),
  appointmentType: z.enum(["online", "in-person"]),
  scheduledAt: z.coerce.date(),
  serviceProvider: z.string().min(1),
  note: z.string().optional(),
});
export const passwordResetSchema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter and one special character"
    ),
});
export const updateAppointmentSchema = appointmentSchema.partial();
