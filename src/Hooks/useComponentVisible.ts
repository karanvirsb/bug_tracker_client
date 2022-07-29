import { useState, useEffect, useRef } from "react";

export default function useComponentVisible() {
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const ref: any = useRef(null);

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("pointerup", handleClickOutside, true);
        return () => {
            document.removeEventListener("pointerup", handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
}
