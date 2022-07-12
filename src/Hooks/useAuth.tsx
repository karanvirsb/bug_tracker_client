import type { RootState } from "../Redux/Store";
import { useSelector } from "react-redux";

// can remove importing this each time
// also gives easy access to auth data
const useAuth = () => {
    const auth = useSelector((state: RootState) => state.persistedReducer.auth);
    const persist = useSelector(
        (state: RootState) => state.persistedReducer.persist.persist
    );
    return { auth, persist };
};

export default useAuth;
