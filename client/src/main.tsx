import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OCIDProvider from "./utils/OCIDProvider";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";

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
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <RouterProvider router={routes} />
        </ThemeProvider>
      </OCIDProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
