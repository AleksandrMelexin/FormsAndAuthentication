import { type TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../store/slices";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
