import { useCallback } from "react";
import { useAppSelector } from "./hooks";
type params = {
    roles: string[] | undefined;
};
const useIsAdmin = () => {
    const roles = useAppSelector((state) => state.auth.roles);
    const getRoles = useCallback(() => {
        console.log(roles);
        if (roles !== undefined) {
            const role: string = "1990";
            return roles.includes(role);
        } else {
            return [];
        }
    }, [roles]);

    return { getRoles };
};

export default useIsAdmin;
