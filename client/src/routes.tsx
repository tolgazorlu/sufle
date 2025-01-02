import { createBrowserRouter } from "react-router-dom";
import { LoginCallBack } from "@opencampus/ocid-connect-js";
import HomeLayout from "./Layout/HomeLayout";
import DashboardLayout from "./Layout/DashboardLayout";
import { HomePage } from "./pages/HomePage";
import { CreatePromptPage } from "./pages/CreatePromptPage";
import DashboardPage from "./pages/DashboardPage";

const onLoginSuccess = () => {
  console.log("success");
  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
};

const onLoginError = () => {
  console.log("Error");
  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
};

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/redirect",
        element: (
          <LoginCallBack
            successCallback={onLoginSuccess}
            errorCallback={onLoginError}
          />
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "create-prompt",
        element: <CreatePromptPage />,
      },
      // Add more dashboard routes here as needed
    ],
  },
]);
