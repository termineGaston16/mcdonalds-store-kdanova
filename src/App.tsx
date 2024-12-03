import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./HEADER/Header";
import NavBar from "./HEADER/NavBar";
import { Provider } from "react-redux";
import { store } from "./REDUX/Store";
import { lazy, Suspense, useEffect, useState } from "react";
import { Product } from "./FIREBASE/interface";
import Products from "./PRODUCTS/Products";
import { useAppDispatch, useAppSelector } from "./REDUX/hooks/useStore";
import { toast, Toaster } from "sonner";
import { CART } from "./DATABASE";

function AppContent() {
    const [resultLocal, setResultLocal] = useState<Product[]>([]);
    const query = new QueryClient();

    const Coupons = lazy(() => import('./COUPONS/Coupons'));
    const Search = lazy(() => import('./SEARCH/Search'));
    const Cart = lazy(() => import('./CART/Cart'));

    const dispatch = useAppDispatch();
    const { isError } = useAppSelector(state => state.cartOfRedux)
    console.log(CART)
    
    useEffect(() => { dispatch({ type: 'cart/getCart' }); }, []);
    useEffect(() => { if (isError) toast(<div>Error al obtener carrito</div>) }, [isError])

    return (
        <QueryClientProvider client={query}>
            <BrowserRouter>
                <Header />
                <NavBar setResultLocal={setResultLocal} />

                <Routes>
                    <Route path="*" element="Error 404" />
                    <Route path="/" element={<Products resultLocal={resultLocal} setResultLocal={setResultLocal} />} />
                    <Route path="/categoria/:category" element={<Products resultLocal={resultLocal} setResultLocal={setResultLocal} />} />
                    <Route path="/buscar/:query" element={<Products resultLocal={resultLocal} setResultLocal={setResultLocal} />} />
                    <Route
                        path="/cupones"
                        element={
                            <Suspense fallback="Cargando Componente: Coupons">
                                <Coupons />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/buscar"
                        element={
                            <Suspense fallback="Cargando Elemento: Search">
                                <Search />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/carrito"
                        element={
                            <Suspense fallback="Cargando Componente: Cart">
                                <Cart />
                            </Suspense>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <AppContent />
            <Toaster position="bottom-center" />
        </Provider>
    );
}
