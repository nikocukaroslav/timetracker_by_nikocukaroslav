import { useEffect, useRef, useState } from "react";

function useTitle<refType>(value: string) {
    const ref = useRef<refType>(null);
    const title = useRef(value);
    const [truncated, setTruncated] = useState<boolean>(false);

    function checkTruncate() {
        const el = ref?.current as HTMLElement;
        const isTruncated = !!el && el.scrollWidth > el.clientWidth;

        if (isTruncated) {
            ref?.current?.setAttribute("title", title.current);
        } else {
            ref?.current?.setAttribute("title", "");
        }

        setTruncated(isTruncated);
    }

    useEffect(() => {
        title.current = value;
        checkTruncate();
    }, [value])

    useEffect(() => {
        window.addEventListener("resize", checkTruncate);

        return () => {
            window.removeEventListener("resize", checkTruncate);
        }
    }, []);

    return {
        ref,
        truncated
    }
}

export default useTitle;
