import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./HEADER/Header";
import NavBar from "./HEADER/NavBar";
import { Provider } from "react-redux";
import { store } from "./REDUX/Store";
import { lazy, Suspense, useState } from "react";
import { Product } from "./FIREBASE/interface";
import Products from "./PRODUCTS/Products";

export default function App() {

    const [resultLocal, setResultLocal] = useState<Product[]>([])
    const query = new QueryClient()

    const Coupons = lazy(() => import('./COUPONS/Coupons'))
    const Search = lazy(()=> import('./SEARCH/Search'))

    return (
        <Provider store={store}>
            <QueryClientProvider client={query}>
                <BrowserRouter>

                    <Header />
                    <NavBar setResultLocal={setResultLocal} />

                    <Routes>
                        <Route path="*" element='Error 404' />

                        <Route path="/" element={<Products resultLocal={resultLocal} setResultLocal={setResultLocal} />} />
                        <Route path="/categoria/:category" element={<Products resultLocal={resultLocal} setResultLocal={setResultLocal} />} />
                        <Route path="/buscar/:query" element={<Products resultLocal={resultLocal} setResultLocal={setResultLocal} />} />
                        <Route path="/cupones" element={
                            <Suspense fallback='Cargando Componente: Coupons'>
                                <Coupons />
                            </Suspense>
                        } />
                        <Route path="/buscar" element={
                            <Suspense fallback='Cargando Elemento: Search'>
                                <Search />
                            </Suspense>
                        } />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    )
}