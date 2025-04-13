import { z } from "zod";
import { userRegistrationSchema } from "../zodSchemas";

export type UserRegistrationForm = z.infer<typeof userRegistrationSchema>;
export interface ApiResponse<T = any> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: Record<string, any> | null;
}
