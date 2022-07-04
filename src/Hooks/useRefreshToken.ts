import axios from "../API/axios";
import { setAuth } from "../Auth/authenticationSlice";
import useAuth from "./useAuth";
import { useDispatch } from "react-redux";

const useRefreshToken = () => {
    const { auth } = useAuth();
    // doing this so we can set the accessToken;
    const refresh = async () => {
        const dispatch = useDispatch();
        // withCrendeitals allows us to send the cookie back
        const response = await axios.get("/refresh", { withCredentials: true });

        const newAuth = { ...auth, accessToken: response.data.accessToken };

        dispatch(setAuth(newAuth));

        return response.data.accessToken; // allwos us to request again
    };

    return refresh;
};

export default useRefreshToken;
