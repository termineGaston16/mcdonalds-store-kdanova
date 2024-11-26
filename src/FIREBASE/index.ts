import { COUPONS, PRODUCTS } from "../DATABASE";
import { Coupon, CouponBogo, CouponFixed, CouponFixedDiscount, CouponPercentage, Product } from "./interface";



// POST GET Y RES.OK


// OBTENER LAS CATEGORIAS PARA EL MENÚ
export async function getCategories(): Promise<Map<Product['category'], Product['img']>> {

    try {
        const filterMap = new Map<Product['category'], Product['img']>()
        PRODUCTS.forEach(proyecto => {
            if (!filterMap.has(proyecto.category.toLocaleLowerCase())) filterMap.set(
                proyecto.category.toLocaleLowerCase(),
                proyecto.img
            )
        })
        return filterMap

    } catch (error) {
        console.error(error)
        throw error
    }
}

// OBTENER RESULTADOS SEGÚN LA CATEGORIA
export async function getProductsByCategory(category: string | undefined, indexResults: number): Promise<Product[]> {

    try {
        if (!category) return PRODUCTS.map(product => ({
            category: product.category,
            description: product.description,
            id: product.id,
            img: product.img,
            name: product.name,
            price: product.price,
            stock: product.stock,
            options: product.options
        } as Product)).slice(indexResults, indexResults + 4)

        return PRODUCTS.filter(product => product.category.toLocaleLowerCase() === category.toLocaleLowerCase()).slice(indexResults, indexResults + 4);

    } catch (error) {
        console.error(error)
        throw error
    }
}

// OBTENER LOS CUPONES DISPONIBLES
export async function getCupons(couponsLength: number): Promise<Coupon<CouponFixed | CouponPercentage | CouponFixedDiscount | CouponBogo>[]> {
    try {
        return COUPONS.map(cupon => ({
            description: cupon.description,
            id: cupon.id,
            img: cupon.img,
            name: cupon.name,
            products: cupon.products,
            type: cupon.type
        } as Coupon<CouponFixed | CouponPercentage | CouponFixedDiscount | CouponBogo>)).slice(couponsLength, couponsLength + 4)
        
    } catch (error) {
        console.error(error)
        throw error
    }
}