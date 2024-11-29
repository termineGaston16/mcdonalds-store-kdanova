import { useNavigate } from "react-router-dom"

interface Props{
    priceTotal: number
}

const ButtonsInCart:React.FC<Props> =({priceTotal})=>{
    const navigate = useNavigate()

    return(<div>
        <button 
        onClick={()=> navigate(-1)}
        type="button">Volver</button>
        <button type="button">Vaciar</button>
        <button type="button">Finalizar compra</button>
        <span>Precio Total: ${priceTotal}</span>
    </div>)
}

export default ButtonsInCart