import { useEffect, useState } from "react";
import {StoreType} from "../core/effector";

export const useStore = (store: StoreType<any>) => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        const unsubscribe = store.watch(setState);

        return () => {
            unsubscribe();
        };
    }, [store]);

    return state;
};