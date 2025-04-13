"use client";

import api from "@/lib/api";
import { useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/store";
import { fetchAppointmentsRequest } from "@/store/appointment/slice";
import { logout, setUser } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  console.log("user authProvider", user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/me");
        console.log("Login response:", response.data.data);
        dispatch(setUser(response.data.data));
      } catch (err) {
        dispatch(logout());
        router.push("/");
      }
    };

    if (!user) fetchUser();
    if (user) dispatch(fetchAppointmentsRequest());
  }, [user]);

  return <>{children}</>;
}
