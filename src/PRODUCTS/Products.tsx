import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getProductsByCategory } from "../FIREBASE"
import { useCallback, useRef, useState } from "react"
import { Product } from "../FIREBASE/interface"
import './Style/products.css'

export default function Products() {

    const { key } = useParams()
    const [resultsLocal, setResultsLocal] = useState<Product[]>([])
    const [openProductDetails, setOpenProductDetails] = useState<boolean>(false)

    const { isError, isLoading, refetch } = useQuery({
        queryKey: ['category', key],
        queryFn: async () => {
            if (!key) return getProductsByCategory(undefined, resultsLocal.length)
            return getProductsByCategory(key, resultsLocal.length)
        },
        onSuccess: (newResults) => {
            setResultsLocal(prevState => [...prevState, ...newResults])
        },
        onError: () => {
            setResultsLocal(resultsLocal)
            alert('Ocurrió un error')
        },
        cacheTime: 0,
        initialData: [],
        refetchInterval: false,
        retry: 2,
        retryDelay: 2000,
        refetchOnWindowFocus: false,
    })

    const resultsObserver = useRef<null | IntersectionObserver>(null)
    const resultsCallback = useCallback((node: null | HTMLElement) => {
        if (isLoading) return
        if (resultsObserver.current) resultsObserver.current.disconnect()
        resultsObserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) { refetch() }
        })
        if (node) resultsObserver.current.observe(node)
    }, [isLoading, refetch])

    return (<main className="products">
        {key ?
            <h2 className="products__title" >{key.charAt(0).toLocaleUpperCase() +
                key.slice(1).toLocaleLowerCase()}</h2> :
            <h2 className="products__title">Todos nuestros Productos</h2>}

        {resultsLocal.length < 0 && <span>No hay resultados...</span>}
        {isLoading && <span>Cargando recursos...</span>}
        {isError && <span>Ocurrió un error inesperado</span>}

        <ul className="products__list">
            {resultsLocal.map((products, index) => (
                <li
                    className="products__list__item"
                    onClick={() => setOpenProductDetails(true)}
                    key={index}
                    ref={index === resultsLocal.length - 1 ? resultsCallback : null}
                >
                    <span className="products__list__item__price">${products.price}</span>
                    <img
                        className="products__list__item__img"
                        src={products.img} alt={products.name.toLocaleUpperCase()} loading="lazy" />
                    <span className="products__list__item__name">{products.name}</span>
                </li>
            ))}
        </ul>

        {openProductDetails && <div>

        </div>}
    </main>)
}



