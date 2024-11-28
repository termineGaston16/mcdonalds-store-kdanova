import { Middleware } from "@reduxjs/toolkit";
import { getCart } from "../../FIREBASE";

// OBTENER DATOS DEL CARRITO
const getCartMiddleware: Middleware = (store) => (next) => async (action: any) => {

    const { type } = action

    next(action)

    if (type === 'cart/getCart') {
        store.dispatch({ type: 'cart/isLoading', payload: true })

        try {
            const result = await getCart()
           
        } catch (error) {
            store.dispatch({ type: 'cart/isError', payload: true })
        } finally {
            store.dispatch({ type: 'cart/isLoading', payload: false })
        }

    }
}

export { getCartMiddleware }