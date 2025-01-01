import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import OCIDProvider from "./utils/OCIDProvider";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <OCIDProvider>
        <RouterProvider router={routes} />
      </OCIDProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
