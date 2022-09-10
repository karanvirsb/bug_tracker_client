import { useEffect, useState } from "react";

type networkState = {
    lastOnline: string;
    lastOffline: string;
    online: boolean;
    rtt?: number;
    type?: string;
    saveData?: boolean;
    downLink?: number;
    downLinkMax?: number;
    effectiveType?: string;
};

function useNetwork() {
    const [networkSettings, setNetworkSettings] = useState<networkState>({
        lastOnline: "",
        lastOffline: "",
        online: navigator.onLine,
        ...getNetworkConnectionInfo(),
    });

    useEffect(() => {
        const isOnline = () => {
            setNetworkSettings((prev) => {
                return {
                    ...prev,
                    online: true,
                    lastOnline: new Date().toString(),
                };
            });
        };

        const isOffline = () => {
            setNetworkSettings((prev) => {
                return {
                    ...prev,
                    online: false,
                    lastOffline: new Date().toString(),
                };
            });
        };

        const handleConnectionChange = () => {
            setNetworkSettings((prevState) => ({
                ...prevState,
                ...getNetworkConnectionInfo(),
            }));
        };

        window.addEventListener("online", isOnline);
        window.addEventListener("offline", isOffline);

        const connection = getNetworkConnection();
        connection?.addEventListener("change", handleConnectionChange);

        return () => {
            window.removeEventListener("online", isOnline);
            window.removeEventListener("offline", isOffline);
            connection?.removeEventListener("change", handleConnectionChange);
        };
    }, [setNetworkSettings]);

    return networkSettings;
}

function getNetworkConnection() {
    return (
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection ||
        null
    );
}

function getNetworkConnectionInfo() {
    const connection = getNetworkConnection();

    if (!connection) {
        return {};
    }

    return {
        rtt: connection.rtt,
        type: connection.type,
        saveData: connection.saveData,
        downLink: connection.downLink,
        downLinkMax: connection.downLinkMax,
        effectiveType: connection.effectiveType,
    };
}

export default useNetwork;
