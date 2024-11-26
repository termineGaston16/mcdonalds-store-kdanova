import { Cart, Coupon, CouponBogo, CouponFixed, CouponFixedDiscount, CouponPercentage, Product } from "./FIREBASE/interface";

export const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Big Mac",
        img: "https://static.wikia.nocookie.net/mcdonalds/images/4/4d/Big_Mac.png/revision/latest?cb=20201207180233&path-prefix=es",
        description: "Doble hamburguesa con lechuga, queso, cebolla, pepinillos y salsa especial.",
        price: 5.99,
        stock: 20,
        category: "Hamburguesas"
    },
    {
        id: "2",
        name: "McChicken",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/DC_202012_0383_CrispyChickenSandwich_PotatoBun_832x472:nutrition-calculator-tile?resmode=sharp2",
        description: "Hamburguesa de pollo empanizado con lechuga y mayonesa.",
        price: 4.99,
        stock: 20,
        category: "Hamburguesas"
    },
    {
        id: "3",
        name: "Quarter Pounder with Cheese",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/DC_202201_0007-005_QuarterPounderwithCheese_832x472:1-3-product-tile-desktop?wid=765&hei=472&dpr=off",
        description: "Hamburguesa con carne de res, queso, cebolla, pepinillos, ketchup y mostaza.",
        price: 5.49,
        stock: 20,
        category: "Hamburguesas"
    },
    {
        id: "4",
        name: "Chicken McNuggets",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-Chicken-McNuggets-6-pieces-2:1-3-product-tile-desktop?wid=829&hei=515&dpr=off",
        description: "Porción de nuggets de pollo.",
        price: 3.99,
        stock: 20,
        category: "Acompañamientos",
        options: {
            sizes: [
                {
                    size: "6 piezas",
                    additionalPrice: 0
                },
                {
                    size: "10 piezas",
                    additionalPrice: 1.99
                },
                {
                    size: "20 piezas",
                    additionalPrice: 4.99
                }
            ]
        }
    },
    {
        id: "5",
        name: "Papas Fritas",
        img: "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kEXemacS/200/200/original?country=ar",
        description: "Porción de papas fritas.",
        price: 2.49,
        stock: 20,
        category: "Acompañamientos",
        options: {
            sizes: [
                {
                    size: "Pequeño",
                    additionalPrice: 0
                },
                {
                    size: "Mediano",
                    additionalPrice: 2.50
                },
                {
                    size: "Grande",
                    additionalPrice: 5.70
                }
            ]
        }
    },
    {
        id: "6",
        name: "Ensalada César",
        img: "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kEXXe08B/200/200/original?country=ar",
        description: "Ensalada con lechuga, pollo a la parrilla, queso parmesano y aderezo César.",
        price: 4.99,
        stock: 20,
        category: "Ensaladas"
    },
    {
        id: "7",
        name: "McFlurry Oreo",
        img: "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kwXEbK9E/200/200/original?country=uy",
        description: "Postre helado con trozos de galleta Oreo.",
        price: 3.49,
        stock: 20,
        category: "Postres"
    },
    {
        id: "8",
        name: "Sundae de Chocolate",
        img: "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$sundae-chocolate.png/200/200/original?country=ar",
        description: "Helado de vainilla con salsa de chocolate.",
        price: 2.99,
        stock: 20,
        category: "Postres"
    },
    {
        id: "9",
        name: "Café",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/DC_201906_2804_MediumCaramelMacchiato_Glass_A1_HL_832x472:nutrition-calculator-tile",
        description: "Café caliente.",
        price: 1.99,
        stock: 20,
        category: "Bebidas",
        options: {
            sizes: [
                {
                    size: "Pequeño",
                    additionalPrice: 0
                },
                {
                    size: "Mediano",
                    additionalPrice: 2.50
                },
                {
                    size: "Grande",
                    additionalPrice: 5.70
                }
            ]
        }
    },
    {
        id: "10",
        name: "Coca-Cola",
        img: "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kcX6zxgK/200/200/original?country=ar",
        description: "Refresco de Coca-Cola.",
        price: 1.99,
        stock: 20,
        category: "Bebidas",
        options: {
            sizes: [
                {
                    size: "Pequeño",
                    additionalPrice: 0
                },
                {
                    size: "Mediano",
                    additionalPrice: 2.50
                },
                {
                    size: "Grande",
                    additionalPrice: 5.70
                }
            ]
        }
    },
    {
        id: "11",
        name: "Filet-O-Fish",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/Header_FiletoFish_832x472:nutrition-calculator-tile?wid=472&hei=472&dpr=off",
        description: "Hamburguesa de pescado con lechuga y salsa tártara.",
        price: 4.49,
        stock: 20,
        category: "Hamburguesas"
    },
    {
        id: "12",
        name: "Double Cheeseburger",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/Header_DoubleCheeseburger_832x472:1-3-product-tile-desktop?wid=763&hei=472&dpr=off",
        description: "Doble hamburguesa con queso, pepinillos, cebolla, ketchup y mostaza.",
        price: 3.99,
        stock: 20,
        category: "Hamburguesas"
    },
    {
        id: "13",
        name: "Hotcakes",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/DC_202208_0031_3HotCakes_832x472:1-3-product-tile-desktop?wid=765&hei=472&dpr=off",
        description: "Tres hotcakes servidos con mantequilla y jarabe.",
        price: 3.49,
        stock: 20,
        category: "Desayunos"
    },
    {
        id: "14",
        name: "Egg McMuffin",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/DC_202004_0046_EggMcMuffin_832x472:1-3-product-tile-desktop?wid=765&hei=472&dpr=off",
        description: "Sandwich de desayuno con huevo, queso y jamón.",
        price: 2.99,
        stock: 20,
        category: "Desayunos"
    },
    {
        id: "15",
        name: "Hash Browns",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-Hash-Brown-New:1-3-product-tile-desktop?wid=829&hei=515&dpr=off",
        description: "Tortitas de papa doradas y crujientes.",
        price: 1.99,
        stock: 20,
        category: "Desayunos"
    },
    {
        id: "16",
        name: "McCafé Mocha",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/DC_201906_2731_MediumMocha_Glass_A1_HL_832x472:1-3-product-tile-desktop?wid=765&hei=472&dpr=off",
        description: "Café con leche vaporizada y chocolate.",
        price: 3.99,
        stock: 20,
        category: "Bebidas"
    },
    {
        id: "17",
        name: "Apple Pie",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-ApplePie:1-3-product-tile-desktop?wid=829&hei=515&dpr=off",
        description: "Pastelito de manzana.",
        price: 1.29,
        stock: 20,
        category: "Postres"
    },
    {
        id: "18",
        name: "Grilled Chicken Sandwich",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-grilled-chicken-sandwich:1-3-product-tile-desktop?wid=829&hei=513&dpr=off",
        description: "Sándwich de pollo a la parrilla con lechuga y tomate.",
        price: 5.49,
        stock: 20,
        category: "Sandwiches"
    },
    {
        id: "19",
        name: "Spicy McChicken",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/DC_201907_4634_HotNSpicyMcChickenDeluxe_832x472:1-3-product-tile-desktop?wid=765&hei=472&dpr=off",
        description: "Hamburguesa de pollo picante con lechuga y mayonesa.",
        price: 4.99,
        stock: 20,
        category: "Hamburguesas"
    },
    {
        id: "20",
        name: "Sweet Tea",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/DC_202105_3429_SweetTea_Glass_A1_832x472:1-3-product-tile-desktop?wid=765&hei=472&dpr=off",
        description: "Té dulce refrescante.",
        price: 1.49,
        stock: 20,
        category: "Bebidas",
        options: {
            sizes: [
                {
                    size: "Pequeño",
                    additionalPrice: 0
                },
                {
                    size: "Mediano",
                    additionalPrice: 2.50
                },
                {
                    size: "Grande",
                    additionalPrice: 5.70
                }
            ]
        }
    }
]

export const CART: Cart = {
    content: [],
    packaging: null,
    priceTotal: 0
}

export const COUPONS: Coupon<CouponFixed | CouponPercentage | CouponFixedDiscount | CouponBogo>[] = [
    {
        id: "a",
        img: '',
        name: "Combo Big Mac",
        description: "Big Mac + Papas Medianas + Coca-Cola Mediana",
        products: ["1", "5", "10"],
        type: {
            type: 'fixed',
            finalPrice: 7.99
        }
    } as Coupon<CouponFixed>,
    {
        id: "b",
        img: '',
        name: "Combo Desayuno",
        description: "Egg McMuffin + Hash Browns + Café Mediano",
        products: ["14", "15", "9"],
        type: {
            type: 'fixed',
            finalPrice: 5.49
        }
    } as Coupon<CouponFixed>,
    {
        id: "c",
        img: '',
        name: "Nuggets + Papas",
        description: "10 Nuggets + Papas Grandes por $6.99",
        products: ["4", "5"],
        type: {
            type: 'fixed',
            finalPrice: 6.99
        }
    } as Coupon<CouponFixed>,
    {
        id: "d",
        img: '',
        name: "Descuento 20% en Postres",
        description: "Obtén un 20% de descuento en cualquier postre.",
        products: [],
        type: {
            type: 'percentage',
            categoryAllowed: 'Postres',
            discountPercent: 20
        }
    } as Coupon<CouponPercentage>,
    {
        id: "e",
        img: '',
        name: "50% en McFlurry Oreo",
        description: "Disfruta un McFlurry Oreo con un 50% de descuento.",
        products: ["7"],
        type: {
            type: 'percentage',
            categoryAllowed: 'Postres',
            discountPercent: 50
        }
    } as Coupon<CouponPercentage>,
    {
        id: "f",
        img: '',
        name: "Descuento $1 en Bebidas",
        description: "Ahorra $1 en cualquier bebida",
        products: [],
        type: {
            type: 'fixed-discount',
            categoryAllowed: 'Bebidas',
            discountAmount: 1
        }
    } as Coupon<CouponFixedDiscount>,
    {
        id: "g",
        img: '',
        name: "2x1 en McChicken",
        description: "Compra un McChicken y obtén otro gratis.",
        products: ["2"],
        type: {
            type: 'bogo'
        }
    } as Coupon<CouponBogo>,

];



