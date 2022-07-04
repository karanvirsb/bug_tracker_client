import axios from "../API/axios";
import { setAuth } from "../Auth/authenticationSlice";
import { useDispatch } from "react-redux";

const useLogout = () => {
    const logout = async () => {
        const dispatch = useDispatch();
        dispatch(
            setAuth({ username: "", accessToken: "", group_id: "", roles: [] })
        ); // reset auth

        try {
            await axios.delete("/logout", { withCredentials: true });
        } catch (err) {
            console.log("error");
        }
    };
    return logout;
};

export default useLogout;
