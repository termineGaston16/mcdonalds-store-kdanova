import { useAppDispatch } from "../../REDUX/hooks/useStore"

export default function useCart() {

    const dispatch = useAppDispatch()

    //SUMAR CANTIDAD PRODUCTO INDIVIDUAL
    const addIndividualProductQuantity = (currentAmount: number,
        limit: number,
        setQuantityProductLocal: React.Dispatch<React.SetStateAction<number>>): void => {

        if (currentAmount < limit) return setQuantityProductLocal(prevAmount => prevAmount + 1)
        return
    }

    //RESTAR CANTIDAD PRODUCTO INDIVIDUAL
    const subtractIndividualProductQuantity = (currentAmount: number,
        setQuantityProductLocal: React.Dispatch<React.SetStateAction<number>>): void => {

        if (currentAmount > 0) return setQuantityProductLocal(prevAmount => prevAmount - 1)
        return
    }

    //AÑADIR PRODUCTO AL CARRITO
    const addProductToCart =(
        productId: string,
        quantityProductLocal: number,
        priceFinal: number
    )=>{
        if(quantityProductLocal < 1) return

        dispatch({type:'cart/addProductToCart', payload: {
            productId: productId,
            quantityProductLocal: quantityProductLocal,
            priceFinal: priceFinal
        }})
    }

    return { addIndividualProductQuantity, subtractIndividualProductQuantity, addProductToCart }
}