import { toast } from "sonner";
import { Cart, Coupon, CouponBogo, CouponFixed, CouponFixedDiscount, CouponPercentage, Product, ProductsInCart, ProductsInCartViewed } from "./interface";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhnRZmvVnBQhhzTaEV2mRGFkQBKi5VCt4",
    authDomain: "mcdonalds-store-31f28.firebaseapp.com",
    projectId: "mcdonalds-store-31f28",
    storageBucket: "mcdonalds-store-31f28.firebasestorage.app",
    messagingSenderId: "424830977170",
    appId: "1:424830977170:web:b12eeef13629c3219fd24b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// POST GET Y RES.OK

// OBTENER LAS CATEGORIAS PARA EL MENÚ
export async function getCategories(): Promise<Map<Product['category'], Product['img']>> {

    try {
        const response = await getDocs(collection(db, 'PRODUCTS'));
        const filterMap = new Map<Product['category'], Product['img']>();

        response.forEach((doc) => {
            const proyect = doc.data() as Product;
            if (!filterMap.has(proyect.category.toLocaleLowerCase())) {
                filterMap.set(
                    proyect.category.toLocaleLowerCase(),
                    proyect.img
                );
            }
        });

        return filterMap;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

// OBTENER RESULTADOS SEGÚN LA CATEGORIA
export async function getProductsByCategory(category: string | undefined, indexResults: number): Promise<Product[]> {

    try {

        const response = await getDocs(collection(db, 'PRODUCTS'))
        const PRODUCTS: Product[] = []

        response.forEach((doc) => {
            const data = doc.data() as Product
            PRODUCTS.push(data)
        })

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
        const response = await getDocs(collection(db, 'COUPONS'))
        const COUPONS: Coupon<CouponFixed>[] = []

        response.forEach(doc => {
            const cupon = doc.data() as Coupon<CouponFixed>
            COUPONS.push(cupon)
        })

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
        const response = await getDocs(collection(db, 'PRODUCTS'))
        const PRODUCTS: Product[] = []

        response.forEach((doc) => {
            const data = doc.data() as Product
            PRODUCTS.push(data)
        })

        return PRODUCTS.filter(products => products.name.toLocaleLowerCase().includes(query)).slice(indexResults, indexResults + 4)
    } catch (error) {
        console.error(error)
        throw error
    }
}

// OBTENER DATOS DEL CARRITO (REFERENCIA)
export async function getCart(): Promise<Cart> {

    try {

        const docRef = doc(db, 'CART', 'NGnbFAO9mHkM2Hhy8drs')
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            
            return {
                content: (docSnap.data() as Cart).content,
                packaging: (docSnap.data() as Cart).packaging,
                priceTotal: (docSnap.data() as Cart).priceTotal
            } as Cart

        } else {

            new Error('Error al obtener datos del carrito')

            return {
                content: [],
                packaging: "EAT HERE",
                priceTotal: 0
            }

        }

    } catch (error) {
        console.error
        throw error
    }
}

// SUBIR PRODUCTOS AL CARRITO
export async function addProductToCart(productInCartLocal: ProductsInCart) {
    try {

        const docRef = doc(db, 'CART', 'NGnbFAO9mHkM2Hhy8drs')
        const docSnap = await getDoc(docRef)

        const CART: Cart = {
            content: (docSnap.data() as Cart).content,
            packaging: (docSnap.data() as Cart).packaging,
            priceTotal: (docSnap.data() as Cart).priceTotal
        }

        const { priceFinal, productId, quantityProductLocal, type, sizeSelectedLocal } = productInCartLocal
        const newProduct = {
            productId,
            priceFinal,
            quantityProductLocal,
            type: type ?? null, // Reemplaza undefined por null (opcional).
            sizeSelectedLocal: sizeSelectedLocal ?? null, // Reemplaza undefined por null (opcional).
        };
        const productInCart = CART.content.some(prod => prod.productId === productId)

        if (productInCart) {
            const indexProductInCart = CART.content.findIndex(prod => prod.productId === productId)
            CART.content[indexProductInCart].quantityProductLocal += quantityProductLocal
        } else {
            CART.content = [...CART.content, newProduct];
        }

        CART.priceTotal += parseFloat((priceFinal * quantityProductLocal).toFixed(2))

        await updateDoc(docRef, {
            content: CART.content,
            priceTotal: CART.priceTotal
        });

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
        const docRef = doc(db, 'CART', 'NGnbFAO9mHkM2Hhy8drs')

        await updateDoc(docRef, {
            packaging: type,
        });

    } catch (error) {
        console.error(error)
        toast.error('Error al cambiar método de empaquetado')
        throw error
    }
}

// CARGAR CUPÓN
export async function loadCoupon(idCoupon: string): Promise<ProductsInCart[]> {
    try {

        const docRef = doc(db, 'CART', 'NGnbFAO9mHkM2Hhy8drs')
        const docSnap = await getDoc(docRef)

        const response = await getDocs(collection(db, 'COUPONS'))
        const COUPONS: Coupon<CouponFixed>[] = []
        response.forEach(doc => {
            const coupon = doc.data() as Coupon<CouponFixed>
            COUPONS.push(coupon)
        })

        const response2 = await getDocs(collection(db, 'PRODUCTS'))
        const PRODUCTS: Product[] = []
        response2.forEach(doc => {
            const prod = doc.data() as Product
            PRODUCTS.push(prod)
        })

        const { content } = (docSnap.data() as Cart)
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

        const response2 = await getDocs(collection(db, 'PRODUCTS'))
        const PRODUCTS: Product[] = []
        response2.forEach(doc => {
            const prod = doc.data() as Product
            PRODUCTS.push(prod)
        })

        const docRef = doc(db, 'CART', 'NGnbFAO9mHkM2Hhy8drs')
        const docSnap = await getDoc(docRef)
        const CART: Cart = {
            content: (docSnap.data() as Cart).content,
            packaging: (docSnap.data() as Cart).packaging,
            priceTotal: (docSnap.data() as Cart).priceTotal
        }


        const productReferenceInCart_DB = CART.content.slice(cartLocalViewedLength, cartLocalViewedLength + 4)
        const isCoupon = productReferenceInCart_DB.filter(prod => prod.type === 'COUPONS')
        const originalProductsIn_DB = PRODUCTS.filter(prod => productReferenceInCart_DB.some(prodRef => prodRef.productId === prod.id))

        return originalProductsIn_DB.map(prod => ({
            id: prod.id,
            img: prod.img,
            name: prod.name,
            price: prod.price,
            sizes: isCoupon.some(pr => pr.productId === prod.id) ? 'COUPONS' : undefined,
            quantity: productReferenceInCart_DB[productReferenceInCart_DB.findIndex(pr => pr.productId === prod.id)].quantityProductLocal,
            size: productReferenceInCart_DB[productReferenceInCart_DB.findIndex(pr => pr.productId === prod.id)].sizeSelectedLocal
        }))

    } catch (error) {
        console.error(error)
        throw error
    }
}

// VACIAR CARRITO
export async function emptyCart() {
    try {

        const docRef = doc(db, 'CART', 'NGnbFAO9mHkM2Hhy8drs')
        const docSnap = await getDoc(docRef)
        const CART: Cart = {
            content: (docSnap.data() as Cart).content,
            packaging: (docSnap.data() as Cart).packaging,
            priceTotal: (docSnap.data() as Cart).priceTotal
        }

        if (CART.content.length < 1) return

        CART.content.splice(0)
        CART.priceTotal = 0

        await updateDoc(docRef, {
            content: [],
            priceTotal: 0
        });

        toast.success('Carrito vacío correctamente!')
    } catch (error) {
        toast.error('Error al vaciar carrito')
        console.error(error)
        throw error
    }
}