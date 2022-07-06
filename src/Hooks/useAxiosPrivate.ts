import { axiosPrivate } from "../API/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAppSelector } from "./hooks";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const auth = useAppSelector((state) => state.auth);

    // useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
        (config: AxiosRequestConfig): AxiosRequestConfig => {
            console.info(`[request] [${JSON.stringify(config)}]`);
            if (config.headers) {
                config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error) => {
            //token expired
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                const newAccessToken = await refresh();
                prevRequest.headers[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
        }
    );

    //     return () => {
    //         axiosPrivate.interceptors.response.eject(responseIntercept);
    //         axiosPrivate.interceptors.request.eject(requestIntercept);
    //     };
    // }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
