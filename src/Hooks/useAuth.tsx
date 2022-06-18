import { useContext } from "react";
import AuthContext from "../Context/AuthProvider";

// can remove importing this each time
// also gives easy access to auth data
const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
