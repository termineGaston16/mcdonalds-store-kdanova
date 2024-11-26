import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../FIREBASE/interface";

export type CartLocal = string | Cart

const initialState: string = ''

export const cartSlice = createSlice({
    initialState,
    name: 'cart',
    reducers: {
        getCart: (state, action)
    }
})

export default cartSlice.reducer