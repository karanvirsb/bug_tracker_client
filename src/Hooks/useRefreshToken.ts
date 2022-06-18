import axios from "../API/axios";
import useAuth from "./useAuth";
import { IStates } from "../Context/AuthProvider";

const useRefreshToken = () => {
    const { setAuth }: any = useAuth(); // doing this so we can set the accessToken;

    const refresh = async () => {
        const response = await axios.get("/refresh", { withCredentials: true });
        // withCrendeitals allows us to send the cookie back

        setAuth((prev: IStates) => {
            return { ...prev, accessToken: response.data.accessToken };
        });

        return response.data.accessToken; // allwos us to request again
    };

    return refresh;
};

export default useRefreshToken;
