import axios from "../API/axios";
import { setAuth } from "../Auth/authenticationSlice";
import { useDispatch } from "react-redux";
import socket from "../API/sockets";
import { setGroup } from "../Redux/Slices/groupSlice";
import { setUser } from "../Redux/Slices/userSlice";

const useLogout = () => {
    const dispatch = useDispatch();
    const logout = async () => {
        // reset auth

        dispatch(
            setGroup({
                groupId: "",
                groupInviteCode: "",
                groupName: "",
                users: [],
            })
        );
        dispatch(
            setUser({
                avatar: { data: "", contentType: "" },
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                isAdmin: false,
                isEditor: false,
            })
        );

        socket.emit("leavingPage");
        socket.disconnect();
        dispatch(
            setAuth({ username: "", accessToken: "", group_id: "", roles: [] })
        );
        try {
            await axios.delete("/logout", { withCredentials: true });
        } catch (err) {
            console.log("error");
        }
    };
    return logout;
};

export default useLogout;
