import { useForceUpdate } from "framer-motion";
import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import decoder, { IDecode } from "../../Helper/decodeToken";
import { useAppSelector } from "../../Hooks/hooks";

type props = {
    allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles }: props) => {
    const auth = useAppSelector((state) => state.auth);
    const user = useAppSelector((state) => state.persistedReducer.user);
    const location = useLocation();

    const decoded: IDecode | undefined = decoder(auth?.accessToken || "");
    const userRoles: string[] = user.username ? ["2001"] : [];
    if (user.isAdmin) {
        userRoles.push("1990");
    }
    if (user.isEditor) {
        userRoles.push("1989");
    }
    const roles = decoded?.UserInfo?.roles || userRoles;

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
