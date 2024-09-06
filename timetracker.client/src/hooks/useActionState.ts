import { useAppSelector } from "@hooks/useAppSelector.ts";

type Action<P> = (payload?: P) => {
    type: string;
    payload?: P;
};

type ActionState = {
    fulfilled: boolean;
    loading: boolean;
    error: {
        message: string;
        code: string;
    } | null;
}

export function useActionState<T extends Action<any>>(action: T): ActionState {
    const actionType = action().type;
    const { fulfilled = false, error = null, loading = false } = useAppSelector(
        ({ actionsState }) => actionsState.actions[actionType]
    ) ?? {};

    return {
        fulfilled,
        error,
        loading
    }
}
