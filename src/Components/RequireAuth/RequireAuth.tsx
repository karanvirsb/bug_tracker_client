import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { IStates } from "../../Context/AuthProvider";
import jwt_decode from "jwt-decode";

type decode = {
    UserInfo: {
        username: string;
        group_id: string;
        roles: [];
    };
};

const RequireAuth = ({ allowedRoles }: any) => {
    const { auth }: IStates = useAuth();
    const location = useLocation();

    const decoded: decode | undefined = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined;

    const roles = decoded?.UserInfo?.roles || [];

    return roles.find((role: never) => allowedRoles?.includes(role)) ? (
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
