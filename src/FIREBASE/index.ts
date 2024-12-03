import { toast } from "sonner";
import { CART, COUPONS, PRODUCTS } from "../DATABASE";
import { Cart, Coupon, CouponBogo, CouponFixed, CouponFixedDiscount, CouponPercentage, Product, ProductsInCart, ProductsInCartViewed } from "./interface";


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

// OBTENER RESULTADOS SEGÚN EL QUERY
export async function getProductsByQuery(query: string, indexResults: number): Promise<Product[]> {
    try {
        return PRODUCTS.filter(products => products.name.toLocaleLowerCase().includes(query)).slice(indexResults, indexResults + 4)
    } catch (error) {
        console.error(error)
        throw error
    }
}

// OBTENER DATOS DEL CARRITO (REFERENCIA)
export async function getCart(): Promise<Cart> {

    try {
        return {
            content: CART.content,
            packaging: CART.packaging,
            priceTotal: CART.priceTotal
        } as Cart

    } catch (error) {
        console.error
        throw error
    }
}

// SUBIR PRODUCTOS AL CARRITO
export async function addProductToCart(productInCartLocal: ProductsInCart) {
    try {

        const { priceFinal, productId, quantityProductLocal } = productInCartLocal
        const productInCart = CART.content.some(prod => prod.productId === productId)

        if (productInCart) {
            const indexProductInCart = CART.content.findIndex(prod => prod.productId === productId)
            CART.content[indexProductInCart].quantityProductLocal += quantityProductLocal
        } else {
            CART.content = [...CART.content, { productId, priceFinal, quantityProductLocal }];
        }

        CART.priceTotal += (priceFinal * quantityProductLocal)
        toast.success(`Product: [${productId}] subido correctamente al carrito en la base de datos`)

    } catch (error) {
        const { productId } = productInCartLocal

        toast.error(`Product: [${productId}] no fue posible subir al carrito en la base de datos`)
        console.error(error)
        throw error
    }
}

// CAMBIAR EL MÉTODO DE EMPAQUETADO
export async function choosePackaging(type: "EAT HERE" | "CARRY" | null) {
    try {
        CART.packaging = type
    } catch (error) {
        console.error(error)
        toast.error('Error al cambiar método de empaquetado')
        throw error
    }
}

// CARGAR CUPÓN
export async function loadCoupon(idCoupon: string): Promise<ProductsInCart[]> {
    try {
        const { content } = CART
        const searchCoupon = content.some(prod => prod.type === 'COUPONS')
        const couponFound = COUPONS.find(coup => coup.id === idCoupon)

        const productsAReturns: ProductsInCart[] = []

        if (searchCoupon) {
            toast.error('Ya existe un cupón registrado')
            throw new Error()
        }

        if (!couponFound) {
            toast.error('Cupón no encontrado')
            throw new Error()
        }

        switch (couponFound?.type.type) {
            case 'fixed':

                const chosenProducts = PRODUCTS.filter(prod => couponFound.products.some(idProd => idProd === prod.id));
                chosenProducts.forEach((prod, index) => {
                    productsAReturns.push({
                        priceFinal: index === 0 ? (couponFound as Coupon<CouponFixed>).type.finalPrice : 0,
                        productId: prod.id,
                        quantityProductLocal: 1,
                        type: 'COUPONS'
                    })
                })

                break;

            default:
                break;
        }

        return productsAReturns

    } catch (error) {
        throw error
    }
}

//CARGAR PRODUCTOS PARA EL CARRITO VISUALIZADO
export async function getCartViewed(cartLocalViewedLength: number): Promise<ProductsInCartViewed[]> {

    try {

        const productReferenceInCart_DB = CART.content.slice(cartLocalViewedLength, cartLocalViewedLength + 4).map(prod => prod.productId)
        const originalProductsIn_DB = PRODUCTS.filter(prod => productReferenceInCart_DB.some(prodRef => prodRef === prod.id))

        return originalProductsIn_DB.map(prod => ({
            id: prod.id,
            img: prod.img,
            name: prod.name,
            price: prod.price,
            sizes: prod.options ? 'COUPONS' : undefined
        }))

    } catch (error) {
        console.error(error)
        throw error
    }
}