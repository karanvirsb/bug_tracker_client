import axios from "../API/axios";
import { setAuth } from "../Auth/authenticationSlice";
import { useDispatch } from "react-redux";
import socket from "../API/sockets";

const useLogout = () => {
    const dispatch = useDispatch();
    const logout = async () => {
        dispatch(
            setAuth({ username: "", accessToken: "", group_id: "", roles: [] })
        ); // reset auth
        socket.emit("leavingPage");
        socket.disconnect();
        try {
            await axios.delete("/logout", { withCredentials: true });
        } catch (err) {
            console.log("error");
        }
    };
    return logout;
};

export default useLogout;
