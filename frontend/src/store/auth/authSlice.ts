"use client";
import { z } from "zod";
import { userRegistrationSchema } from "@/lib/zodSchemas"; // adjust path if needed
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authSchema = userRegistrationSchema
  .omit({
    password: true,
    profileImage: true,
  })
  .extend({
    profileImage: z.string().url().optional(), // or just z.string() if not URL
    _id: z.string(),
    username: z.string(),
  });

// Infer TypeScript type
export type AuthSchema = z.infer<typeof authSchema>;
interface AuthState {
  user: AuthSchema | null;
  isloading: boolean;
}

const initialState: AuthState = {
  user: null,
  isloading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthSchema>) => {
      state.user = action.payload;
      state.isloading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isloading = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
