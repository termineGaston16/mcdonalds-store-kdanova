import { Link } from "react-router-dom";
import { FaOpencart } from "react-icons/fa6";

export default function ButtonGoCart(){
    return(<Link to={'/carrito'}>Tu Carrito <FaOpencart /></Link>)
}