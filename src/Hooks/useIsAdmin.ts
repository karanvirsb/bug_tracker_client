import { useEffect, useState } from "react";
import { useAppSelector } from "./hooks";

// Checking to see if a user is an admin or an editor
const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditor, setIsEditor] = useState(false);
    const user = useAppSelector((state) => state.persistedReducer.user);

    useEffect(() => {
        setIsAdmin(user.isAdmin);
    }, [user.isAdmin]);

    useEffect(() => {
        setIsEditor(user.isEditor);
    }, [user.isEditor]);

    return { isAdmin: isAdmin, isEditor: isEditor };
};

export default useIsAdmin;
