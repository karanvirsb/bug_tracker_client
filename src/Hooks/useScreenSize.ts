import { useEffect, useState } from "react";

const useScreenSize = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    useEffect(() => {
        function handleWindowResize() {
            setScreenWidth(() => window.innerWidth);
            setScreenHeight(() => window.innerHeight);
        }

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return { screenWidth, screenHeight };
};

export default useScreenSize;
