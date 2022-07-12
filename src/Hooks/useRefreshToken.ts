import axios from "../API/axios";
import { setAuth, updateAccessToken } from "../Auth/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../Hooks/hooks";
import mem from "mem";
const useRefreshToken = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.persistedReducer.auth);
    // doing this so we can set the accessToken;
    const refresh = async () => {
        try {
            const response = await axios.get("/refresh", {
                withCredentials: true,
                timeout: 30000,
            });

            dispatch(
                setAuth({ ...auth, accessToken: response.data.accessToken })
            );
            // console.log(response.data.accessToken);
            return response.data.accessToken; // allwos us to request again
            // withCrendeitals allows us to send the cookie back
        } catch (error) {
            dispatch(
                setAuth({
                    username: "",
                    accessToken: "",
                    group_id: "",
                    roles: [],
                })
            );
        }
    };

    return mem(refresh);
};

export default useRefreshToken;
