import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getCategories } from "../FIREBASE";
import './Style/navbar.css'
import { Product } from "../FIREBASE/interface";

export default function NavBar() {

    const { data: categories = new Map<Product['category'], Product['img']>, isLoading, isError } = useQuery({
        queryKey: ['menus'],
        queryFn: async () => getCategories(),
        refetchInterval: false,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        retry: 2,
        retryDelay: 2000
    })

    return (<nav className="nav-bar">
        <ul className="nav-bar__list">
            <li className="nav-bar__list__item">
                <img className="nav-bar__list__item__img"
                    src="" alt="Logo para la opción: Elegir Empaquetado" />
                <span>Elegir Empaquetado</span>
            </li>
            <Link className="nav-bar__list__item__link" to={'/'}>
                <li className="nav-bar__list__item">
                    <img
                        className="nav-bar__list__item__img"
                        src="" alt="Logo para la opción: Inicio" />
                    <span>Inicio</span>
                </li>
            </Link>

            {isLoading && <span>Cargando Categorías...</span>}
            {isError && <span>Ocurrió un error</span>}
            {categories.size > 0 && Array.from(categories).map(([key, value], index) => (
                <Link
                    className="nav-bar__list__item__link"
                    key={index}
                    to={`/${key}`}
                >
                    <li className="nav-bar__list__item">
                        <img
                            className="nav-bar__list__item__img"
                            src={value}
                            alt={`Logo para la categoría: ${key}`}
                        />
                        <span>
                            {key.charAt(0).toLocaleUpperCase() + key.slice(1).toLocaleLowerCase()}
                        </span>
                    </li>
                </Link>
            ))}
            
            <Link
                className="nav-bar__list__item__link"
                to={'/cupones'}>
                <li className="nav-bar__list__item">
                    <img
                        className="nav-bar__list__item__img"
                        src="" alt="Logo para la opción: Canjear Cupones" />
                    <span>Canjear Cupones</span>
                </li>
            </Link>
            <Link
                className="nav-bar__list__item__link"
                to={'/buscar'}>
                <li className="nav-bar__list__item">
                    <img
                        className="nav-bar__list__item__img"
                        src="" alt="Logo para la opción: Buscar nuestros Productos" />
                    <span>Buscar nuestros Productos</span>
                </li>
            </Link>
        </ul>
    </nav>)
}