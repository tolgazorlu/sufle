import { createBrowserRouter } from "react-router-dom";
import { LoginCallBack } from "@opencampus/ocid-connect-js";
import HomeLayout from "./Layout/HomeLayout";
import { HomePage } from "./pages/HomePage";
import { CreatePromptPage } from "./pages/CreatePromptPage";

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
        path: "/create-prompt",
        element: <CreatePromptPage />,
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
]);
