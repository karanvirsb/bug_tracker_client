import axios from "../API/axios";
import { setAuth } from "../Auth/authenticationSlice";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth } = useAuth();
    // doing this so we can set the accessToken;
    const refresh = async () => {
        // withCrendeitals allows us to send the cookie back
        const response = await axios.get("/refresh", { withCredentials: true });

        const newAuth = { ...auth, accessToken: response.data.accessToken };

        setAuth(newAuth);

        return response.data.accessToken; // allwos us to request again
    };

    return refresh;
};

export default useRefreshToken;
