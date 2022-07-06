import axios from "../API/axios";
import { setAuth } from "../Auth/authenticationSlice";
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

        const newAuth = {
            ...auth,
            accessToken: response.data.accessToken,
            roles: response.data.roles,
        };
        console.log(newAuth);
        dispatch(setAuth(newAuth));

        return response.data.accessToken; // allwos us to request again
    };

    return refresh;
};

export default useRefreshToken;
