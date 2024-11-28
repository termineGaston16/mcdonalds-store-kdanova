import { useNavigate } from "react-router-dom"

export default function ButtonsInCart(){
    const navigate = useNavigate()

    return(<div>
        <button 
        onClick={()=> navigate(-1)}
        type="button">Volver</button>
        <button type="button">Vaciar</button>
        <button type="button">Finalizar compra</button>
        <span>Precio Total: $0</span>
    </div>)
}