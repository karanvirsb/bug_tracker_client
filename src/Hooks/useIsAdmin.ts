import { useCallback } from "react";
import { useAppSelector } from "./hooks";

// Checking to see if a user is an admin or an editor
const useIsAdmin = () => {
    const user = useAppSelector((state) => state.persistedReducer.user);

    return { isAdmin: user.isAdmin, isEditor: user.isEditor };
};

export default useIsAdmin;
