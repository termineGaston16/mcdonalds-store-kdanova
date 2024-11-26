import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../FIREBASE";
import { useCallback, useRef, useState } from "react";
import './Style/products.css';
import { Product } from "../FIREBASE/interface";
import { IoMdAddCircleOutline } from "react-icons/io";

interface Props {
    resultLocal: Product[]
    setResultLocal: React.Dispatch<React.SetStateAction<Product[]>>
}

const Products: React.FC<Props> = ({ resultLocal, setResultLocal }) => {
    const { key } = useParams();
    const [productOpen, setProductOpen] = useState<Product | null>(null)

    const { isError, isLoading, refetch } = useQuery({
        queryKey: ['category', key],
        queryFn: async () => {
            if (!key) return await getProductsByCategory(undefined, resultLocal.length);
            return await getProductsByCategory(key, resultLocal.length);
        },
        onSuccess: (newResults) => {
            if (resultLocal.length < 1) return setResultLocal(newResults)
            return setResultLocal(prevState => [...prevState, ...newResults]);
        },
        onError: () => {
            alert('Ocurrió un error');
        },
        cacheTime: 0,
        initialData: [],
        refetchInterval: false,
        retry: 2,
        retryDelay: 2000,
        refetchOnWindowFocus: false,
    });

    const resultsObserver = useRef<null | IntersectionObserver>(null);
    const resultsCallback = useCallback((node: null | HTMLElement) => {
        if (isLoading) return;
        if (resultsObserver.current) resultsObserver.current.disconnect();
        resultsObserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) { refetch() }
        });
        if (node) resultsObserver.current.observe(node);
    }, [isLoading, refetch]);

    return (
        <main className="products">
            {key ? (
                <h2 className="products__title">
                    {key.charAt(0).toLocaleUpperCase() + key.slice(1).toLocaleLowerCase()}
                </h2>
            ) : (
                <h2 className="products__title">Todos nuestros Productos</h2>
            )}

            {resultLocal.length < 1 && !isLoading && !isError && <span>No hay resultados...</span>}
            {isLoading && <span>Cargando recursos...</span>}
            {isError && <span>Ocurrió un error inesperado</span>}

            <ul className="products__list">
                {resultLocal.map((products, index) => (
                    <li
                        className="products__list__item"
                        onClick={() => setProductOpen(products)}
                        key={index}
                        ref={index === resultLocal.length - 1 ? resultsCallback : null}
                    >
                        <span className="products__list__item__price">${products.price}</span>
                        <img
                            className="products__list__item__img"
                            src={products.img}
                            alt={products.name.toLocaleUpperCase()}
                            loading="lazy"
                        />
                        <span className="products__list__item__name">{products.name}</span>
                    </li>
                ))}
            </ul>

            {productOpen && <div className="productOpen__content">
                <div className="productOpen">
                    <section className="productOpen__face-one">
                        <span className="productOpen__face-one__name">{productOpen.name}</span>
                        <img
                            className="productOpen__face-one__img"
                            src={productOpen.img} alt={productOpen.name.toLocaleUpperCase()} />
                    </section>
                    <section className="productOpen__face-two">
                        <button
                            className="productOpen__close"
                            type="button"
                            onClick={() => setProductOpen(null)}>Cerrar</button>

                        <p className="productOpen__face-two__description">{productOpen.description}</p>

                        <span className="productOpen__face-two__price">${productOpen.price}</span>

                        {productOpen.stock > 0
                            ?
                            <><span className="productOpen__face-two__stock">Stock disponible: {productOpen.stock}</span>
                                <hr className="productOpen__face-two__hr" />
                                <fieldset className="productOpen__face-two__interaction-cart">
                                    <legend className="productOpen__face-two__interaction-cart__title">Añade este producto al carrito</legend>
                                    <div className="productOpen__face-two__interaction-cart__buttons">
                                        <button className="productOpen__face-two__interaction-cart__btn" type="button">{"<"}</button>
                                        <span className="productOpen__face-two__interaction-cart__amount">0</span>
                                        <button className="productOpen__face-two__interaction-cart__btn" type="button">{">"}</button>
                                    </div>
                                    <button className="productOpen__face-two__interaction-cart__btn-add" type="button">Añadir <IoMdAddCircleOutline /></button>
                                </fieldset> </>
                            :
                            <span className="productOpen__face-two__no-stock">Lo sentimos pero no hay más cantidades de momento.</span>}
                    </section>
                </div>
            </div>}
        </main>
    );
}

export default Products;
