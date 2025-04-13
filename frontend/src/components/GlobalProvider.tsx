"use client";
import { store } from "@/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import AuthProvider from "./auth/AuthProvider";
import Navbar from "./Navbar";

function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Navbar />
      {children}
      <Toaster position="top-center" />
    </Provider>
  );
}

export default GlobalProvider;
