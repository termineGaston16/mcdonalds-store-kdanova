import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../REDUX/hooks/useStore"
import useCart from "../customHook/useCart"

export default function ButtonsInCart() {

    const { data } = useAppSelector(state => state.cartOfRedux)
    const { emptyCart } = useCart()
    const navigate = useNavigate()

    return (<div>
        <button
            onClick={() => navigate(-1)}
            type="button">Volver</button>

        <button
            onClick={emptyCart}
            type="button">Vaciar</button>

        <span>Precio Total: ${data?.priceTotal.toFixed(2)}</span>
    </div>)
}
