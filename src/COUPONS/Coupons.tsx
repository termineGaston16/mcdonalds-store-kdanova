import { useCallback, useRef, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { useQuery } from "react-query";
import { Coupon, CouponBogo, CouponFixed, CouponFixedDiscount, CouponPercentage } from "../FIREBASE/interface";
import { getCupons } from "../FIREBASE";
import ButtonGoCart from "../CART/Element/ButtonGoCart";
import { toast, Toaster } from "sonner";
import useCoupons from "./customHook/useCoupons";
import CouponLoading from "../LOADINGS/CouponLoading";
import { useAppSelector } from "../REDUX/hooks/useStore";
import LoadingIntoAComponent from "../LOADINGS/LoadingIntoAComponent";
import './Style/coupons.css'

export default function Coupons() {

    const [cupounsLocal, setCupounsLocal] = useState<Coupon<CouponFixed | CouponPercentage | CouponFixedDiscount | CouponBogo>[]>([])
    const { isLoading: isLoadingInCart } = useAppSelector(state => state.cartOfRedux)
    const { loadCoupon } = useCoupons()

    const { isError, isLoading, refetch } = useQuery({
        queryKey: ['cupons'],
        queryFn: async () => await getCupons(cupounsLocal.length),
        cacheTime: 0,
        onError: () => { toast.error('Ocurrió un error con: getProductsByQuery || getProductsByCategory') },
        onSuccess: (newResults) => { setCupounsLocal(prevState => [...prevState, ...newResults]) },
        refetchInterval: false,
        refetchOnWindowFocus: false,
        retry: 2,
        retryDelay: 2000
    })

    const observer = useRef<IntersectionObserver | null>(null)
    const observerFc = useCallback((node: null | HTMLElement) => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                refetch()
            }
        })
        if (node) observer.current.observe(node)

    }, [isLoading, refetch])

    return (<main className="coupons">
        <h3 className="coupons__title">¡Disfruta de nuestros descuentos especiales!</h3>
        <span className="coupons__alert">
            <CiCircleAlert className="coupons__alert__icon" /> <br /> sólo es permitido obtener un cupón por cada compra</span>
        <ButtonGoCart />

        <ul className="coupons__list">
            {cupounsLocal.map((cupons, index) => (
                <li
                    className="coupons__list__item"
                    onClick={() => { loadCoupon(cupons.id) }}
                    ref={index === cupounsLocal.length - 1 ? observerFc : null}
                    key={index}>
                    <img 
                    className="coupons__list__item__img"
                    src={cupons.img} alt={cupons.name.toLocaleUpperCase()} loading="lazy" />
                    <h2 className="coupons__list__item__name">{cupons.name}</h2>
                    <p className="coupons__list__item__description">{cupons.description}</p>
                </li>
            ))}
        </ul>
        {isLoading && <LoadingIntoAComponent />}
        {isError && <span>Error al cargar</span>}
        {cupounsLocal.length < 1 && !isLoading && !isError && <span>No hay cupones disponibles...</span>}

        {isLoadingInCart && <CouponLoading />}
        <Toaster position="bottom-center" />
    </main>)
}