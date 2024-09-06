import { tap } from "rxjs";

import { resetAction, setFulfilled } from "@/store/slices/actionsStateSlice.ts";
import store from "@store";

export const resetState = <T>(type?: string) => tap<T>((data) => {
    const actionType = type || data?.type;

    if (actionType)
        store.dispatch(resetAction(actionType));
});

export const fulfilled = <T>(type: string) => tap<T>(() => store.dispatch(setFulfilled(type)));