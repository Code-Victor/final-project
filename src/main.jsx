import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { Details, Home, Login } from "./pages";
import { ThemeProvider } from "./providers/theme-provider";
import { AuthProvider, RequireAuthentication } from "./providers/auth-provider";
import server from "./server.js";
import TripDashboard from "./pages/trip-dashboard";
import TripProvider from "./providers/trip-provider";
// Initialize the server
server();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuthentication>
        <Home />
      </RequireAuthentication>
    ),
  },
  {
    path: "/detail/:placeId",
    element: (
      <RequireAuthentication>
        <Details />
      </RequireAuthentication>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/trip-dashboard",
    element: <TripDashboard />,
  },
]);
const queryClient = new QueryClient();
const root = document.getElementById("root");

if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TripProvider>
            <RouterProvider router={router} />
            <Toaster richColors />
          </TripProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
