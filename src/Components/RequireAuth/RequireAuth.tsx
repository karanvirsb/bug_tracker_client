import { useLocation, Navigate, Outlet } from "react-router-dom";
import decoder from "../../Helper/decodeToken";
import { IDecode } from "../../Helper/decodeToken";
import { useAppSelector } from "../../Hooks/hooks";

const RequireAuth = ({ allowedRoles }: any) => {
    const auth = useAppSelector((state) => state.persistedReducer.auth);
    const location = useLocation();

    const decoded: IDecode | undefined = decoder(auth?.accessToken || "");

    const roles = decoded?.UserInfo?.roles || [];

    return roles.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet></Outlet>
    ) : auth?.username ? (
        <Navigate
            to='/unauthorized'
            state={{ from: location }}
            replace
        ></Navigate>
    ) : (
        <Navigate to='/login' state={{ from: location }} replace></Navigate>
    );
};

export default RequireAuth;
