import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import decoder, { IDecode } from "../../Helper/decodeToken";
import { useAppSelector } from "../../Hooks/hooks";

type props = {
    allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles }: props) => {
    const auth = useAppSelector((state) => state.persistedReducer.auth);
    const location = useLocation();

    const decoded: IDecode | undefined = decoder(auth?.accessToken || "");

    const roles = decoded?.UserInfo?.roles || [];

    const authenticatedUserExists = auth?.username ? (
        <Navigate
            to='/unauthorized'
            state={{ from: location }}
            replace
        ></Navigate>
    ) : (
        <Navigate to='/login' state={{ from: location }} replace></Navigate>
    );

    return roles.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet></Outlet>
    ) : (
        authenticatedUserExists
    );
};

export default RequireAuth;
