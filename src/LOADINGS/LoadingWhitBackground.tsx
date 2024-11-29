import { AiOutlineLoading } from "react-icons/ai";
import './Style/loadingWhiteBackground.css'

export default function LoadingWhiteBackground() {
    return (<div className="loadingWhiteBackground__background">
        <span className="loadingWhiteBackground__container">
            <AiOutlineLoading className="loadingWhiteBackground__container__logo"/></span>
    </div>)
}