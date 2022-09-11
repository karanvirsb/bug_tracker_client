import axios from "../API/axios";
import { setAuth } from "../Auth/authenticationSlice";
import { useAppDispatch } from "../Hooks/hooks";
import mem from "mem";
import decoder, { IDecode } from "../Helper/decodeToken";
import useLogout from "./useLogout";

const useRefreshToken = () => {
    const dispatch = useAppDispatch();
    const logout = useLogout();
    // doing this so we can set the accessToken;
    const refresh = async () => {
        try {
            const response = await axios.get("/refresh", {
                withCredentials: true,
                timeout: 30000,
            });
            console.log(
                "🚀 ~ file: useRefreshToken.ts ~ line 18 ~ refresh ~ response",
                response
            );

            const userData = response?.data;

            const userInfo: IDecode | undefined = decoder(userData.accessToken);
            const groupId =
                typeof userInfo?.UserInfo.group_id === "object"
                    ? (userInfo?.UserInfo.group_id as []).join("")
                    : userInfo?.UserInfo.group_id;

            dispatch(
                setAuth({
                    username: userInfo?.UserInfo.username,
                    roles: userInfo?.UserInfo.roles,
                    group_id: groupId,
                    accessToken: response.data.accessToken,
                })
            );

            return response.data.accessToken; // allwos us to request again
            // withCrendeitals allows us to send the cookie back
        } catch (error: any) {
            console.log(
                "🚀 ~ file: useRefreshToken.ts ~ line 41 ~ refresh ~ error",
                error
            );
            // if (error.response.status === 401) {
            //     logout();
            // }
        }
    };

    return mem(refresh);
};

export default useRefreshToken;
