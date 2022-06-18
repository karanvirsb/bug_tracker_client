import axios from "../API/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth }: any = useAuth();

    const logout = async () => {
        setAuth({}); // reset auth

        try {
            await axios.delete("/logout", { withCredentials: true });
        } catch (err) {
            console.log("error");
        }
    };
    return logout;
};

export default useLogout;
