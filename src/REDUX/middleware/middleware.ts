import { Middleware } from "@reduxjs/toolkit";
import { addProductToCart, getCart } from "../../FIREBASE";
import { toast } from "sonner";

// OBTENER DATOS DEL CARRITO
const getCartMiddleware: Middleware = (store) => (next) => async (action: any) => {

    next(action)
    const { type } = action

    if (type === 'cart/getCart') {
        store.dispatch({ type: 'cart/isLoading', payload: true })

        try {
            const result = await getCart()
            store.dispatch({ type: 'cart/updateCart', payload: result })
        } catch (error) {
            store.dispatch({ type: 'cart/isError', payload: true })
        } finally {
            store.dispatch({ type: 'cart/isLoading', payload: false })
        }

    }
}

// AGREGAR PRODUCTO AL CARRITO
const addProductToCartMiddleware: Middleware = (store) => (next) => async (action: any) => {
    next(action)

    const { type, payload } = action

    if (type === 'cart/addProductToCart') {
        store.dispatch({ type: 'cart/addProduct', payload: payload })

        try {
            await addProductToCart(payload)
            toast.success('Producto añadido!')
        } catch (error) {
            store.dispatch({ type: 'cart/addProduct__REMOVE', payload: payload })
        }
    }
}

export { getCartMiddleware, addProductToCartMiddleware }