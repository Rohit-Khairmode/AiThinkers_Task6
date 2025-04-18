"use client";
import { store } from "@/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import Navbar from "./Navbar/Navbar";
import { StyledEngineProvider } from "@mui/material";
import AuthProvider from "./auth/AuthProvider";

function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navbar />
        {children}
        <Toaster
          position="top-center"
          gutter={12} //gap between window and toaster
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000, //3sec
            },
            error: {
              duration: 5000, //5 sec
            },
            style: {
              fontSize: "18px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#333",
              color: "#fff",
            },
          }}
        />
      </AuthProvider>
    </Provider>
  );
}

export default GlobalProvider;
