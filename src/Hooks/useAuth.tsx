import type { RootState } from "../Store";
import { useSelector } from "react-redux";

// can remove importing this each time
// also gives easy access to auth data
const useAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const persist = useSelector((state: RootState) => state.persist.persist);
    return { auth, persist };
};

export default useAuth;
