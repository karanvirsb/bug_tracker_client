import { useCallback } from "react";
import { useAppSelector } from "./hooks";

// Checking to see if a user is an admin or an editor
const useIsAdmin = () => {
    const user = useAppSelector((state) => state.persistedReducer.user);

    const getRoles = useCallback(() => {
        return user.isAdmin || user.isEditor;
    }, [user.isAdmin, user.isEditor]);

    return { getRoles };
};

export default useIsAdmin;
