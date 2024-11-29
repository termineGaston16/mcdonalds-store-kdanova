import { useCallback, useRef, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { useQuery } from "react-query";
import { Coupon, CouponBogo, CouponFixed, CouponFixedDiscount, CouponPercentage } from "../FIREBASE/interface";
import { getCupons } from "../FIREBASE";
import ButtonGoCart from "../CART/Element/ButtonGoCart";
import { toast, Toaster } from "sonner";

export default function Coupons() {

    const [cupounsLocal, setCupounsLocal] = useState<Coupon<CouponFixed | CouponPercentage | CouponFixedDiscount | CouponBogo>[]>([])

    const { isError, isLoading, refetch } = useQuery({
        queryKey: ['cupons'],
        queryFn: async () => await getCupons(cupounsLocal.length),
        cacheTime: 0,
        initialData: [],
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

    return (<main>
        <h3>¡Disfruta de nuestros descuentos especiales!</h3>
        <span><CiCircleAlert /> <br /> sólo es permitido obtener un cupón por cada compra</span>
        <ButtonGoCart />

        <div>
        </div>
        <ul>
            {cupounsLocal.map((cupons, index) => (
                <li
                    ref={index === cupounsLocal.length - 1 ? observerFc : null}
                    key={index} style={{ border: '1px solid red', margin: '100px' }}>
                    <img src={cupons.img} alt={cupons.name.toLocaleUpperCase()} />
                    <h2>{cupons.name}</h2>
                    <p>{cupons.description}</p>
                </li>
            ))}
        </ul>
        {isLoading && <span>Cargando Cupones...</span>}
        {isError && <span>Error al cargar</span>}
        {cupounsLocal.length < 1 && !isLoading && !isError && <span>No hay cupones disponibles...</span>}
        <Toaster />
    </main>)
}