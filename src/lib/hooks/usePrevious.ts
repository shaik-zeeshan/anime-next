import { useState } from "react";

export function usePrevious<T>(state: T) {
    let [tuple, setTuple] = useState([null, state]);
    if (tuple[1] !== state) {
        setTuple([tuple[1], state]);
    }
    return tuple[0];
}
