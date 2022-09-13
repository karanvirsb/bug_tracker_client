import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import decoder, { IDecode } from "../../Helper/decodeToken";
import { useAppSelector } from "../../Hooks/hooks";
import { IUser } from "../../Redux/Slices/userSlice";

type props = {
    allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles }: props) => {
    const auth = useAppSelector((state) => state.auth);
    const user = useAppSelector((state) => state.persistedReducer.user);
    const location = useLocation();

    const decoded: IDecode | undefined = decoder(auth?.accessToken || "");
    const userRoles: string[] = getUserRoles(user);
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
function getUserRoles(user: IUser) {
    const roles = user.username ? ["2001"] : [];
    if (user.isAdmin) {
        roles.push("1990");
    }
    if (user.isEditor) {
        roles.push("1989");
    }

    return roles;
}

export default RequireAuth;
