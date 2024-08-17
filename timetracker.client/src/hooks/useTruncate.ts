import { useEffect, useRef, useState } from "react";

function useTruncate<T>() {
    const ref = useRef<T>(null);
    const [truncated, setTruncated] = useState<boolean>(false);

    function checkTruncate() {
        const el = ref?.current as HTMLElement;
        const isTruncated = !!el && el.scrollWidth > el.clientWidth;

        setTruncated(isTruncated);
    }

    useEffect(() => {
        window.addEventListener("resize", checkTruncate);

        return () => {
            window.removeEventListener("resize", checkTruncate);
        }
    }, []);

    return {
        ref,
        truncated,
        checkTruncate
    }
}

export default useTruncate;
