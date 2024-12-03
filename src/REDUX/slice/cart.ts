import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, ProductsInCart } from "../../FIREBASE/interface";

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
        },
        updateCart: (state, action: PayloadAction<Cart>) => {
            state.data = action.payload
        },
        addProduct: (state, action: PayloadAction<ProductsInCart>) => {

            if (!state.data) throw new Error('Data es null')

            const { priceFinal, productId, quantityProductLocal, type } = action.payload
            const { content } = state.data
            const productInCart = content.some(prod => prod.productId === productId)

            if (productInCart) {
                const indexProductInCart = content.findIndex(prod => prod.productId === productId)
                if (indexProductInCart < 0) throw new Error('indexProductInCart no encontrado')

                content[indexProductInCart].quantityProductLocal += quantityProductLocal
            } else {
                content.push({
                    priceFinal: priceFinal,
                    productId: productId,
                    quantityProductLocal: quantityProductLocal,
                    type: type
                })
            }

            if (type === 'COUPONS') {
                state.data.priceTotal += priceFinal
            } else {
                state.data.priceTotal += (priceFinal * quantityProductLocal)
            }
        },
        addProduct__REMOVE: (state, action: PayloadAction<ProductsInCart>) => {

            if (!state.data) throw new Error('Data es null')

            const { productId } = action.payload
            const { content } = state.data

            const indexProductInCart = content.findIndex(prod => prod.productId === productId)
            if (indexProductInCart < 0) throw new Error('indexProductInCart no encontrado')
            content.splice(indexProductInCart, 1)
        },
        packaging: (state, action: PayloadAction<"EAT HERE" | "CARRY" | null>) => {

            if (!state.data) throw new Error('Data es null')

            const { payload } = action
            state.data.packaging = payload
        }
    }
})

export default cartSlice.reducer