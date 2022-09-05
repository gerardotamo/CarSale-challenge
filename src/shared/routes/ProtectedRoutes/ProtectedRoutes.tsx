import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGeneralContext } from "../../contexts/StoreProvider";

const ProtectedRoutes = () => {
  const { state } = useGeneralContext();
  const uuid = state.auth.admin.uuid;

  return uuid === undefined ? <Navigate to={"login"} replace /> : <Outlet />;
};

export default ProtectedRoutes;
