import { SiMcdonalds } from "react-icons/si";
import './Style/couponLoading.css'

export default function CouponLoading() {
    return (<div className="coupon-loading__background">
        <div className="coupon-loading">
            <h2 className="coupon-loading__title">Procesando...</h2>
            <SiMcdonalds className="coupon-loading__icon" />
            <span className="coupon-loading__loading-bar"></span>
        </div>
    </div>)
}