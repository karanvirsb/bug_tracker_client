import React, { useEffect, useState } from "react";
import useNetwork from "../../Hooks/useNetwork";

const NetworkCheck = ({ children }: any) => {
    const [isOffline, setIsOffline] = useState(false);

    const network = useNetwork();

    useEffect(() => {
        let interval: NodeJS.Timer;
        if (!network.online) {
            interval = setInterval(() => {
                if (
                    (new Date().getTime() -
                        new Date(network.lastOffline).getTime()) /
                        1000 >
                    10
                ) {
                    setIsOffline(true);
                    clearInterval(interval);
                }
            }, 1000);
        } else {
            setIsOffline(false);
        }

        return () => {
            clearInterval(interval);
        };
    }, [network, network.online]);

    return <>{!isOffline ? children : <div>You are offline</div>}</>;
};

export default NetworkCheck;
