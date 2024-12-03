export interface Product {
    id: string,
    name: string,
    img: string
    description: string,
    price: number,
    stock: number,
    category: string,
    options?: {
        sizes: {
            size: string,
            additionalPrice: number
        }[]
    }
}

export interface Cart {
    content: ProductsInCart[],
    priceTotal: number,
    packaging: 'EAT HERE' | 'CARRY' | null
}

export interface ProductsInCart {
    productId: Product['id'],
    quantityProductLocal: number,
    priceFinal: number,
    type?: 'COUPONS',
    sizeSelectedLocal?: string
}

export interface ProductsInCartViewed {
    id: Product['id'],
    name: Product['name'],
    img: Product['img']
    price: Product['price'],
    sizes?: string,
    quantity: number,
    size?: string
}

export interface Coupon<T> {
    id: string,
    img: string,
    name: string,
    description: string,
    products: string[],
    type: T
}

export interface CouponFixed {
    type: 'fixed',
    finalPrice: number
}

export interface CouponPercentage {
    type: 'percentage',
    discountPercent: number,
    categoryAllowed: Product['category']
}

export interface CouponFixedDiscount {
    type: "fixed-discount",
    discountAmount: number,
    categoryAllowed: Product['category']
}

export interface CouponBogo {
    type: "bogo",
}
