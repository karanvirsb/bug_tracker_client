import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useRefreshToken from "../../Hooks/useRefreshToken";
import { useAppSelector } from "../../Hooks/hooks";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const auth = useAppSelector((state) => state.persistedReducer.auth);
    const persist = useAppSelector(
        (state) => state.persistedReducer.persist.persist
    );

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        // we need to have access to the accessToken before we can verifyREfreshToken

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => {
            isMounted = false;
        };
    }, [auth.accessToken, refresh]);

    return (
        <>
            {!persist ? (
                <Outlet></Outlet>
            ) : isLoading ? (
                <p>Loading....</p>
            ) : (
                <Outlet></Outlet>
            )}
        </>
    );
};

export default PersistLogin;
