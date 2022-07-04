import axios from "../API/axios";
import { setAuth } from "../Auth/authenticationSlice";

const useLogout = () => {
    const logout = async () => {
        setAuth({ username: "", accessToken: "", group_id: "", roles: [] }); // reset auth

        try {
            await axios.delete("/logout", { withCredentials: true });
        } catch (err) {
            console.log("error");
        }
    };
    return logout;
};

export default useLogout;
