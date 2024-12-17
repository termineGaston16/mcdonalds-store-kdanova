import { Link } from "react-router-dom";
import { FaOpencart } from "react-icons/fa6";
import '../Style/buttonGoCart.css'

export default function ButtonGoCart(){
    return(<Link to={'/carrito'} className="ButtonGoCart">Tu Carrito <FaOpencart className="ButtonGoCart__icon"/></Link>)
}