"use client";
import { z } from "zod";
import { userRegistrationSchema } from "@/lib/zodSchemas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authSchema = userRegistrationSchema
  .omit({
    password: true,
    profileImage: true,
  })
  .extend({
    profileImage: z.string().url().optional(),
    _id: z.string(),
    username: z.string(),
  });

// Infer TypeScript type
export type AuthSchema = z.infer<typeof authSchema>;
interface AuthState {
  user: AuthSchema | null;
  isloading: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isloading: true,
  } as AuthState,
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
