import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductsByCategory, getProductsByQuery } from "../FIREBASE";
import { useCallback, useRef, useState } from "react";
import './Style/products.css';
import { Product } from "../FIREBASE/interface";
import { IoMdAddCircleOutline } from "react-icons/io";
import ButtonGoCart from "../CART/Element/ButtonGoCart";
import { toast, Toaster } from "sonner";
import LoadingWhiteBackground from "../LOADINGS/LoadingWhitBackground";
import useCart from "../CART/customHook/useCart";

interface Props {
    resultLocal: Product[]
    setResultLocal: React.Dispatch<React.SetStateAction<Product[]>>,
}

const Products: React.FC<Props> = ({ resultLocal, setResultLocal }) => {

    const { category, query } = useParams();
    const { addIndividualProductQuantity, subtractIndividualProductQuantity, addProductToCart} = useCart()

    const [productOpen, setProductOpen] = useState<Product | null>(null)
    const [quantityProductLocal, setQuantityProductLocal] = useState<number>(0)
    const [aditionalPriceLocal, setAditionalPriceLocal] = useState<number>(0)
    const [sizeSelectedLocal, setSizeSelectedLocal] = useState<string | undefined>(undefined)

    const { isLoading, refetch } = useQuery({
        queryKey: ['category', category, query],
        queryFn: async () => {
            if (query) {
                const newQuery = filterQuery(query)
                if (newQuery) {
                    return await getProductsByQuery(query, resultLocal.length)
                }
            }

            if (!category) return await getProductsByCategory(undefined, resultLocal.length);
            return await getProductsByCategory(category, resultLocal.length);
        },
        onSuccess: (newResults) => {
            if (resultLocal.length < 1) return setResultLocal(newResults)
            return setResultLocal(prevState => [...prevState, ...newResults]);
        },
        onError: () => {
            toast.error('Ocurrió un error con: getProductsByQuery || getProductsByCategory')
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

    const filterQuery = (queryParam: string): undefined | string => {
        const newQuery = queryParam
            .toLocaleLowerCase()
            .trim()
            .replace(/[^\w\s]/g, '')

        if (newQuery.length > 0) return newQuery
        return undefined
    }

    return (
        <main className="products">
            {category ? (
                <h2 className="products__title">
                    {category.charAt(0).toLocaleUpperCase() + category.slice(1).toLocaleLowerCase()}
                </h2>
            ) : query ? (
                (<h2 className="products__title">Buscar: {query.toLocaleLowerCase()}</h2>)
            ) : (<h2 className="products__title">Todos nuestros Productos</h2>)}

            <ButtonGoCart />

            {isLoading && <LoadingWhiteBackground />}
            {resultLocal.length > 0
                &&
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
                </ul>}

            {productOpen && <div className="productOpen__content">
                <div className="productOpen">
                    <section className="productOpen__face-one">
                        <span className="productOpen__face-one__name">{productOpen.name}</span>
                        <img
                            className="productOpen__face-one__img"
                            loading="lazy"
                            src={productOpen.img} alt={productOpen.name.toLocaleUpperCase()} />
                    </section>
                    <section className="productOpen__face-two">
                        <button
                            className="productOpen__close"
                            type="button"
                            onClick={() => {
                                setProductOpen(null)
                                setQuantityProductLocal(0)
                            }}>Cerrar</button>

                        <p className="productOpen__face-two__description">{productOpen.description}</p>

                        <span className="productOpen__face-two__price">${(productOpen.price + aditionalPriceLocal).toFixed(2)}</span>

                        {productOpen.stock > 0
                            ?
                            <><span className="productOpen__face-two__stock">Stock disponible: {productOpen.stock}</span>
                                <hr className="productOpen__face-two__hr" />
                                <fieldset className="productOpen__face-two__interaction-cart">
                                    <legend className="productOpen__face-two__interaction-cart__title">Añade este producto al carrito</legend>

                                    <div className="productOpen__face-two__interaction-cart__buttons">
                                        <button
                                            onClick={() => subtractIndividualProductQuantity(
                                                quantityProductLocal,
                                                setQuantityProductLocal
                                            )}
                                            className="productOpen__face-two__interaction-cart__btn"
                                            type="button">
                                            {"<"}
                                        </button>

                                        <span className="productOpen__face-two__interaction-cart__amount">{quantityProductLocal}</span>

                                        <button
                                            onClick={() => addIndividualProductQuantity(
                                                quantityProductLocal,
                                                productOpen.stock,
                                                setQuantityProductLocal
                                            )}
                                            className="productOpen__face-two__interaction-cart__btn"
                                            type="button">
                                            {">"}
                                        </button>
                                    </div>

                                    {productOpen.options && <div>
                                        <ul>
                                            {productOpen.options.sizes.map((options, index) => (
                                                <li key={index}>
                                                    <input type="radio"
                                                        defaultChecked={index === 0}
                                                        id={`productOpenOption_${index + 1}`}
                                                        name="productOpenOption"
                                                        onChange={() => {
                                                            setAditionalPriceLocal(options.additionalPrice)
                                                            setSizeSelectedLocal(options.size)
                                                        }}
                                                    />

                                                    <label htmlFor={`productOpenOption_${index + 1}`}>
                                                        <span>+${options.additionalPrice}</span>
                                                        <span>{options.size}</span>
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>}

                                    <button
                                        style={{ opacity: (quantityProductLocal > 0 ? `1` : '.5') }}
                                        onClick={() => {
                                            if (quantityProductLocal < 1) return

                                            addProductToCart(
                                                productOpen.id,
                                                quantityProductLocal,
                                                parseFloat((productOpen.price + aditionalPriceLocal).toFixed(2)),
                                                sizeSelectedLocal
                                            )
                                            setProductOpen(null)
                                            setQuantityProductLocal(0)
                                        }}
                                        className="productOpen__face-two__interaction-cart__btn-add"
                                        type="button">
                                        Añadir <IoMdAddCircleOutline />
                                    </button>
                                </fieldset> </>
                            :
                            <span className="productOpen__face-two__no-stock">Lo sentimos pero no hay más cantidades de momento.</span>}
                    </section>
                </div>
            </div>}

            <Toaster position="bottom-center" />
        </main>
    );
}

export default Products;
