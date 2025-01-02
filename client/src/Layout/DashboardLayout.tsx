import { Navigate, Outlet } from "react-router-dom";
import { useOCAuth } from "@opencampus/ocid-connect-js";
const DashboardLayout = () => {
  const { OCId } = useOCAuth();

  if (!OCId) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default DashboardLayout;
