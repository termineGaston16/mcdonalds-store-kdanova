import { configureStore } from "@reduxjs/toolkit";
import { addProductToCartMiddleware, getCartMiddleware } from "./middleware/middleware";
import  cartSlice  from "./slice/cart";

export const store = configureStore({
    reducer: {
        cartOfRedux: cartSlice,
    },
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(
        getCartMiddleware, addProductToCartMiddleware)
})

export type StoreType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

