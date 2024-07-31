import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {State} from "../interfaces/state.ts";

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
