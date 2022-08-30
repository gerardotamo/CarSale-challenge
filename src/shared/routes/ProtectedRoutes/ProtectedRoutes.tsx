import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGeneralContext } from "../../contexts/StoreProvider";

const ProtectedRoutes = () => {
    const context = useGeneralContext();
    const uuid = context?.state.auth.admin.uuid;

    return(
        uuid === undefined ? <Navigate to={'login'} replace/> : <Outlet />
    )
}

export default ProtectedRoutes;