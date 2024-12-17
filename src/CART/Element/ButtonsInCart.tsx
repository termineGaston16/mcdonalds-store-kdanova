import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../REDUX/hooks/useStore"
import { TbGardenCartOff } from "react-icons/tb";
import { IoMdArrowBack } from "react-icons/io";
import useCart from "../customHook/useCart"

export default function ButtonsInCart() {

    const { data } = useAppSelector(state => state.cartOfRedux)
    const { emptyCart } = useCart()
    const navigate = useNavigate()

    return (<div className="buttons-in-cart">
        <button
            className="buttons-in-cart__btn"
            onClick={() => navigate(-1)}
            type="button"><IoMdArrowBack className="buttons-in-cart__btn__icon" /> Volver</button>

        <button
            className="buttons-in-cart__btn"
            onClick={emptyCart}
            type="button"><TbGardenCartOff className="buttons-in-cart__btn__icon"/> Vaciar</button>

        <span className="buttons-in-cart__total-price">Precio Total: ${data?.priceTotal.toFixed(2)}</span>
    </div>)
}
