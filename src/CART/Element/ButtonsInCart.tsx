import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../REDUX/hooks/useStore"

interface Props {
    priceTotal: number
}

export default function ButtonsInCart(){

    const { data } = useAppSelector(state => state.cartOfRedux)
    const navigate = useNavigate()

    return (<div>
        <button
            onClick={() => navigate(-1)}
            type="button">Volver</button>
        <button type="button">Vaciar</button>
        <button type="button">Finalizar compra</button>
        <span>Precio Total: ${data?.priceTotal}</span>
    </div>)
}
