export {};
// import { axiosPrivate } from "../API/axios";
// import { useEffect } from "react";
// import useRefreshToken from "./useRefreshToken";
// import { useAppDispatch, useAppSelector } from "./hooks";
// import { AxiosRequestConfig, AxiosResponse } from "axios";
// import useLogout from "./useLogout";
// import { useNavigate } from "react-router-dom";

// const useAxiosPrivate = () => {
//     const refresh = useRefreshToken();
//     const auth = useAppSelector(
//         (state) => state.persistedReducer.auth.accessToken
//     );
//     const navigate = useNavigate();

//     const requestIntercept = axiosPrivate.interceptors.request.use(
//         async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
//             axiosPrivate.defaults.headers.common["Authorization"] = "";
//             // console.log("here in request");

//             // const decoded = decoder(auth ?? "");
//             // let isExpired = false;

//             // // checking to see if we are over the expired date
//             // if (decoded && decoded.exp) {
//             //     isExpired =
//             //         Math.floor(new Date().getTime() / 1000) >= decoded?.exp;
//             // }

//             // if (isExpired) {
//             //     const newAccessToken = await refresh();
//             //     if (config.headers) {
//             //         config.headers[
//             //             "Authorization"
//             //         ] = `Bearer ${newAccessToken}`;
//             //     }
//             //     // dispatch(updateAccessToken(newAccessToken));
//             // } else {
//             if (config.headers) {
//                 config.headers["Authorization"] = `Bearer ${auth}`;
//             }
//             // }

//             return Promise.resolve(config);
//         },
//         (error) => {
//             return Promise.reject(error);
//         }
//     );

//     const responseIntercept = axiosPrivate.interceptors.response.use(
//         (response: AxiosResponse) => response,
//         async (err) => {
//             axiosPrivate.defaults.headers.common["Authorization"] = "";
//             //token expired
//             const error = err.response;

//             if (error.status === 403 && !error.config.__isRetryRequest) {
//                 const resp = await refresh();
//                 console.log(resp);
//                 // prevRequest.headers[
//                 //     "Authorization"
//                 // ] = `Bearer ${newAccessToken}`;
//                 error.config.defaults.headers.common[
//                     "Authorization"
//                 ] = `Bearer ${resp.data.accessToken}`;

//                 error.config.__isRetryRequest = true;
//             } else if (error.status === 404) {
//                 navigate("/pageNotFound");
//             }
//             return axiosPrivate(error.config);
//         }
//     );
//     useEffect(() => {
//         return () => {
//             axiosPrivate.interceptors.response.eject(responseIntercept);
//             axiosPrivate.interceptors.request.eject(requestIntercept);
//         };
//     }, []);

//     return axiosPrivate;
// };

// export default useAxiosPrivate;
