import { AxiosRequestConfig, AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { axiosPrivate } from "../../API/axios";
import { useAppSelector } from "../../Hooks/hooks";
import useLogout from "../../Hooks/useLogout";
import useRefreshToken from "../../Hooks/useRefreshToken";

/**
 * Created a top level component with interceptors for axios
 * @param param0 Any children
 * @returns on unmount it will eject the interceptors
 */
export const AxiosInterceptor = ({ children }: any) => {
    const refresh = useRefreshToken();
    const logout = useLogout();
    const auth = useAppSelector((state) => state.auth);
    useEffect(() => {
        // for each request send the authorization token
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
                axiosPrivate.defaults.headers.common["Authorization"] =
                    "Bearer ";
                if (auth.accessToken) {
                    if (config.headers) {
                        config.headers[
                            "Authorization"
                        ] = `Bearer ${auth.accessToken}`;
                    }
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // for each response
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error) => {
                //token expired
                const config = error?.config;

                // if (error.response.status === 401 && !auth.accessToken) {
                //     logout();
                // }

                // if the status is not a 403 then reject it
                if (
                    error.response.status !== 403 &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    return Promise.reject(error);
                }
                if (error.response.status === 403) {
                    if (!config.__isRetryRequest) {
                        config.__isRetryRequest = true;
                        const token = await refresh();

                        if (token) {
                            if (config.headers) {
                                config.headers[
                                    "Authorization"
                                ] = `Bearer ${token}`;
                            }
                        }

                        return axiosPrivate(config);
                    }

                    return Promise.reject(error);
                }
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);
        };
    }, [auth, logout, refresh]);

    return children;
};

export default axiosPrivate;
