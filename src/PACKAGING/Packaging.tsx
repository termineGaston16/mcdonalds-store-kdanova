import useCart from '../CART/customHook/useCart'
import './Style/packaging.css'
export default function Packging() {

    const { choosePackaging } = useCart()

    return (<div className="packaging__component">
        <div className="packaging">
            <h3 className="packaging__title">¿Cómo le preparamos su comida?</h3>
            <section className="packaging__options">
                <button
                    onClick={() => choosePackaging('EAT HERE')}
                    className="packaging__options__btn" type="button">
                    <span className="packaging__options__btn__span">Para Comer Aquí</span>
                    <img
                        className="packaging__options__btn__img"
                        src="" loading="lazy" alt="OPCION_COMER_AQUI" />
                </button>
                <button
                    onClick={() => choosePackaging('CARRY')}
                    className="packaging__options__btn" type="button">
                    <span className="packaging__options__btn__span">Para Llevar </span>
                    <img
                        className="packaging__options__btn__img"
                        src="" loading="lazy" alt="OPCION_LLEVAR" />
                </button>
            </section>
        </div>
    </div>)
}