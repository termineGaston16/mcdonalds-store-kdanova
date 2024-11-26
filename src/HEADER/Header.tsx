import { SiMcdonalds } from "react-icons/si";
import { MdPolicy } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import './Style/header.css'
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <ul className="header__list">
                <li className="header__list__item">
                    <a className="header__list__item__link" href="https://www.mcdonalds.com.ar/" target="_blank" rel="noopener noreferrer"><SiMcdonalds /></a></li>
                <li className="header__list__item">
                    <a className="header__list__item__link" href="https://www.mcdonalds.com.ar/politica-de-privacidad" target="_blank" rel="noopener noreferrer"><MdPolicy /></a></li>
                <li className="header__list__item">
                    <a className="header__list__item__link" href="https://www.youtube.com/user/McDonaldsSur" target="_blank" rel="noopener noreferrer"><FaYoutube /></a></li>
                <li className="header__list__item">
                    <a className="header__list__item__link" href="https://www.facebook.com/McDonaldsArgentina/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
                <li className="header__list__item">
                    <a className="header__list__item__link" href="https://www.instagram.com/mcdonalds_ar/" target="_blank" rel="noopener noreferrer"><FaInstagramSquare /></a></li>
            </ul>
            <Link className="header__link" to={'/'}>
                <img className="header__link__logotipo" src="" alt="Logotipo de McDonalds Store" loading="lazy" />
            </Link>
            <span className="header__copy">McDonald's ©2024 <br /> KDA/NOVA ©2024</span>
        </header>
    )
}