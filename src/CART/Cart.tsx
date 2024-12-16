import { useQuery } from "react-query";
import ButtonsInCart from "./Element/ButtonsInCart";
import { useCallback, useRef, useState } from "react";
import { ProductsInCartViewed } from "../FIREBASE/interface";
import { getCartViewed } from "../FIREBASE";
import { toast, Toaster } from "sonner";
import LoadingIntoAComponent from "../LOADINGS/LoadingIntoAComponent";
import './Style/cart.css'

export default function Cart() {

    const [cartLocalViewed, setCartLocalViewed] = useState<ProductsInCartViewed[]>([])
    console.log(cartLocalViewed);
    

    const { isLoading, refetch } = useQuery({
        queryKey: ['cartLocalViewed'],
        queryFn: async () => await getCartViewed(cartLocalViewed.length),
        cacheTime: 0,
        onError: () => { toast.error('Error al mostrar productos') },
        onSuccess: (newResults) => { setCartLocalViewed(prevResults => [...prevResults, ...newResults]) },
        refetchInterval: false,
        refetchOnWindowFocus: false,
        retry: 2,
        retryDelay: 2000,
    })

    const observer = useRef<IntersectionObserver | null>(null)
    const cartLocalViewedObserver = useCallback((node: null | HTMLElement) => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entres => {
            if (entres[0].isIntersecting) {
                refetch()
            }
        })

        if (node) observer.current.observe(node)
    }, [isLoading, refetch])

    return (<main className="cart">
        <h3 className="cart__title">Tu Carrito</h3>
        <p className="cart__text">Aquí puedes ver todos los productos almanceados antes de comprarlos.</p>
        <ButtonsInCart />

        <ul className="cart__list">
            {cartLocalViewed.length > 0
                ?
                cartLocalViewed.map((prod, index) => (
                    <li
                        className={`cart__item ${prod.sizes && 'cupon'}`}
                        key={index}
                        ref={index === cartLocalViewed.length - 1 ? cartLocalViewedObserver : null}>
                        <span>${prod.price} {prod.sizes}</span>
                        <span>Cantidad: ({prod.quantity})</span>
                        <img src={prod.img} alt={prod.name.toLocaleUpperCase()} loading="lazy" />
                        <h3>{prod.name}</h3>
                        <h5>{prod.size}</h5>
                    </li>
                ))
                :
                !isLoading && <span>No hay productos en tu carrito</span>}

            {isLoading && <LoadingIntoAComponent />}
        </ul>

        <Toaster position="bottom-center" />
    </main>)
}