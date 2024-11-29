import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../REDUX/hooks/useStore"
import ButtonsInCart from "./Element/ButtonsInCart";
import { toast, Toaster } from "sonner";
import LoadingWhiteBackground from "../LOADINGS/LoadingWhitBackground";

export default function Cart() {

    const dispatch = useAppDispatch()
    const { data, isError, isLoading } = useAppSelector(state => state.cartOfRedux)
    console.log(data);
    
    useEffect(() => {dispatch({ type: 'cart/getCart' })}, [])
    useEffect(() => {if (isError) toast.error('Error al obtener el carrito')}, [isError])

    return (<main>
        <h3>Tu Carrito</h3>
        <p>Aquí puedes ver todos los productos almanceados antes de comprarlos.</p>

        <ButtonsInCart priceTotal={data?.priceTotal ?? 0} />

        {isLoading && <LoadingWhiteBackground />}

        {(data?.content.length ?? 0) > 0
            ? <span>¡Hay objetos!</span>
            : <span>No hay objetos</span>}

        <Toaster richColors position="bottom-right" />
    </main>)
}