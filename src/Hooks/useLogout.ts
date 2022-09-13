import axios from "../API/axios";
import { setAuth } from "../Auth/authenticationSlice";
import { useDispatch } from "react-redux";
import socket from "../API/sockets";
import { setGroup } from "../Redux/Slices/groupSlice";
import { setUser } from "../Redux/Slices/userSlice";
import { changePersist } from "../Auth/persistSlice";
import { Dispatch, AnyAction } from "redux";

const useLogout = () => {
    const dispatch = useDispatch();
    const logout = async () => {
        try {
            await axios.delete("/logout", { withCredentials: true });
            // reseting group slice
            resetGroup(dispatch);
            // reseting user slice
            resetUser(dispatch);

            sendSocketInfo();

            // resetting authentication
            resetAuth(dispatch);

            resetPersist(dispatch);
        } catch (err) {
            // console.log("error");
        }
    };
    return logout;
};

export default useLogout;
function resetPersist(dispatch: Dispatch<AnyAction>) {
    dispatch(changePersist(false));
}

function resetAuth(dispatch: Dispatch<AnyAction>) {
    dispatch(
        setAuth({ username: "", accessToken: "", group_id: "", roles: [] })
    );
}

function sendSocketInfo() {
    socket.emit("leavingPage");
    socket.disconnect();
}

function resetUser(dispatch: Dispatch<AnyAction>) {
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
}

function resetGroup(dispatch: Dispatch<AnyAction>) {
    dispatch(
        setGroup({
            groupId: "",
            groupInviteCode: "",
            groupName: "",
            users: [],
        })
    );
}
