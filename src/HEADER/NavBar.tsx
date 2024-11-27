import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { getCategories } from "../FIREBASE";
import './Style/navbar.css'
import { Product } from "../FIREBASE/interface";

interface Props {
    setResultLocal: React.Dispatch<React.SetStateAction<Product[]>>
}

const NavBar: React.FC<Props> = ({ setResultLocal }) => {

    const { data: categories = new Map<Product['category'], Product['img']>, isLoading, isError } = useQuery({
        queryKey: ['menus'],
        queryFn: async () => getCategories(),
        refetchInterval: false,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        retry: 2,
        retryDelay: 2000
    })

    const location = useLocation()
    const emptyResults =(locationQuery: string)=>{
        if(locationQuery !== decodeURIComponent(location.pathname)) setResultLocal([])
    }
    
    return (<nav className="nav-bar">
        <ul className="nav-bar__list">
            <li className="nav-bar__list__item">
                <img className="nav-bar__list__item__img"
                    src="" alt="Logo para la opción: Elegir Empaquetado" />
                <span>Elegir Empaquetado</span>
            </li>
            <Link
                onClick={() => emptyResults('/')}
                className="nav-bar__list__item__link" to={'/'}>
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
                    onClick={() => emptyResults(`/categoria/${key}`)}
                    className="nav-bar__list__item__link"
                    key={index}
                    to={`/categoria/${key}`}
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
                onClick={() => emptyResults('/cupones')}
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
                onClick={() => emptyResults('/buscar')}
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

export default NavBar;