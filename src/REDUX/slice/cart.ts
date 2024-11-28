import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../../FIREBASE/interface";

export interface CartLocal {
    data: null | Cart,
    isLoading: boolean,
    isError: boolean
}

const initialState: CartLocal = {
    data: null,
    isError: false,
    isLoading: false
}

export const cartSlice = createSlice({
    initialState,
    name: 'cart',
    reducers: {
        isLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        isError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload
        }
    }
})

export default cartSlice.reducer