import { useEffect, useMemo, useRef } from "react";
import { debounce } from "underscore";

export const useDebounce = (callback, waitTime) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
        const func = () => {
            ref.current?.();
        };

        return debounce(func, waitTime);
    }, []);

    return debouncedCallback;
};
