import { useState, useEffect, useRef } from "react";
/**
 * Hook is used to check the visibility of an element usually a pop up menu
 * @returns Object {ref: the reference to the pop up element, isComponentVisible: whether the ref is visible, setIsComponentVisible: setting visibility of element}
 */
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
