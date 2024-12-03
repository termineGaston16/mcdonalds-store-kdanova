import { Middleware } from "@reduxjs/toolkit";
import { addProductToCart, choosePackaging, emptyCart, getCart, loadCoupon } from "../../FIREBASE";
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
        } catch (error) {
            store.dispatch({ type: 'cart/addProduct__REMOVE', payload: payload })
        }
    }
}

// ELEGIR MÉTODO DE EMPAQUETADO
const choosePackagingMiddleware: Middleware = (store) => (next) => async (action: any) => {

    next(action)
    const { type, payload } = action

    if (type === 'cart/choosePackaging') {
        store.dispatch({ type: 'cart/packaging', payload: payload })
        try {
            await choosePackaging(payload)
        } catch (error) {
            store.dispatch({ type: 'cart/packaging', payload: null })
        }
    }

}

// CARGAR CUPÓN
const loadCouponMiddleware: Middleware = (store) => (next) => async (action: any) => {
    next(action)
    const { type, payload } = action

    if (type === 'cart/loadCoupon') {

        store.dispatch({ type: 'cart/isLoading', payload: true })

        try {
            const newProducts = await loadCoupon(payload)
            newProducts.forEach(prod => store.dispatch({ type: 'cart/addProductToCart', payload: prod }))
            toast.success('¡Cupón obtenido correctamente!')

        } catch (error) {
            console.error(error)
        } finally {
            store.dispatch({ type: 'cart/isLoading', payload: false })
        }
    }
}

// VACIAR CARRITO
const emptyCartMiddleware: Middleware = (store) => (next) => async (action: any) => {
    next(action)
    const { type } = action

    if (type === 'cart/emptyCart') {

        store.dispatch({ type: 'cart/empty' })

        try {
            await emptyCart()
        } catch (error) {
            store.dispatch({ type: 'cart/getCart' })
        }
    }
}

export { getCartMiddleware, addProductToCartMiddleware, choosePackagingMiddleware, loadCouponMiddleware, emptyCartMiddleware }