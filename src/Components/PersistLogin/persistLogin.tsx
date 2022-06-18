import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../Hooks/useRefreshToken";
import useAuth from "../../Hooks/useAuth";
import { IStates } from "../../Context/AuthProvider";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist }: IStates = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        // we need to have access to the accessToken before we can verifyREfreshToken

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => {
            isMounted = false;
        };
    }, []);

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
