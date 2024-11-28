import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../REDUX/hooks/useStore"
import ButtonsInCart from "./Element/ButtonsInCart";

export default function Cart() {

    const dispatch = useAppDispatch()
    const cartOfRedux = useAppSelector(state => state.cartOfRedux)
    console.log(cartOfRedux);

    useEffect(()=>{
        dispatch({type:'cart/getCart'})
    },[])

    return (<main>
        <h3>Tu Carrito</h3>
        <p>Aquí puedes ver todos los productos almanceados antes de comprarlos.</p>
        <ButtonsInCart />
        
        
    </main>)
}