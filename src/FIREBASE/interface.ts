export interface Product {
    id: string,
    name: string,
    img:string
    description: string,
    price: number,
    stock: number,
    category: string,
    options?: {
        sizes: string[]
    }
}

export interface Cart{
    content: ProductsInCart[],
    priceTotal: number,
    packaging: 'EAT HERE' | 'CARRY' | null
}

export interface ProductsInCart{
    id: Product['id'],
    name: Product['name']
    img: Product['img']
    description: Product['description']
    price: Product['price']
    stockInCart: number
    chosenSize: number
}
