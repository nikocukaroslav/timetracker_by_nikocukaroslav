import { setError } from "@/store/slices/actionsSlice.ts";

interface SetErrorAction {
    type: typeof setError.type;
    payload: Array<object>;
}

export type ActionStateActions = SetErrorAction