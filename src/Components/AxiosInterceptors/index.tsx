import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect } from "react";
import { axiosPrivate } from "../../API/axios";
import { useAppSelector } from "../../Hooks/hooks";
import useRefreshToken from "../../Hooks/useRefreshToken";

export const AxiosInterceptor = ({ children }: any) => {
    const refresh = useRefreshToken();
    const auth = useAppSelector(
        (state) => state.persistedReducer.auth.accessToken
    );

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
                axiosPrivate.defaults.headers.common["Authorization"] = "";
                if (auth) {
                    if (config.headers) {
                        config.headers["Authorization"] = "";
                        config.headers["Authorization"] = `Bearer ${auth}`;
                    }
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
                const config = error?.config;

                if (error.response.status !== 403) {
                    Promise.reject(error);
                }

                if (!config.__isRetryRequest) {
                    config.__isRetryRequest = true;
                    const token = await refresh();

                    if (token) {
                        if (config.headers) {
                            config.headers["Authorization"] = "";
                            config.headers["Authorization"] = `Bearer ${token}`;
                        }
                    }
                    return axiosPrivate(config);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);
        };
    }, [auth, refresh]);

    return children;
};

export default axiosPrivate;
