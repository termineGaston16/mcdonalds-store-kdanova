import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "../Store";

export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;
export const useAppDispatch: ()=> AppDispatch = useDispatch