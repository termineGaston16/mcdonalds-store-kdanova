import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "../../REDUX/hooks/useStore"

export default function useCoupons() {

    const { data, isLoading } = useAppSelector(state => state.cartOfRedux)
    const dispatch = useAppDispatch()

    // CARGAR CUPÓN
    const loadCoupon = (idCoupon: string): void => {
        if (!data?.content) {
            toast(<div>Error: Data.content es null</div>)
            return
        }

        const searchCoupon = data.content.some(prod => prod.type === 'COUPONS')
        if (searchCoupon) {
            toast(<div>Ya hay un cupón utilizado en tu carrito</div>)
            return
        }
        
        dispatch({ type: 'cart/loadCoupon', payload: idCoupon })
        return
    }

    return { isLoading, loadCoupon }
}