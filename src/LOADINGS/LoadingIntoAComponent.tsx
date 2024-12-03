import { FaCircle } from "react-icons/fa";
import './Style/loadingIntoAComponent.css'

export default function LoadingIntoAComponent() {
    return (<div className="loadingIntoAComponent">
        <FaCircle className="icon" />
        <FaCircle className="icon" />
        <FaCircle className="icon" />
    </div>)
}