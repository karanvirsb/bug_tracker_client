import axios from "../API/axios";
import { updateAccessToken } from "../Auth/authenticationSlice";
import { useAppSelector, useAppDispatch } from "../Hooks/hooks";
const useRefreshToken = () => {
    const auth = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();
    // doing this so we can set the accessToken;
    const refresh = async () => {
        // withCrendeitals allows us to send the cookie back
        const response = await axios.get("/refresh", {
            withCredentials: true,
        });

        dispatch(updateAccessToken(response.data.accessToken));

        return response.data.accessToken; // allwos us to request again
    };

    return refresh;
};

export default useRefreshToken;
