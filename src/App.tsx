import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./HEADER/Header";
import NavBar from "./HEADER/NavBar";
import { Provider } from "react-redux";
import { store } from "./REDUX/Store";
import { lazy, Suspense } from "react";

export default function App() {

    const query = new QueryClient()
    const Products = lazy(()=> import('./PRODUCTS/Products'))

    return (
        <Provider store={store}>
            <QueryClientProvider client={query}>
                <BrowserRouter>

                    <Header />
                    <NavBar />

                    <Routes>
                        <Route path="*" element='Error 404' />

                        <Route path="/:key?" element={<Suspense fallback='Cargando componente: Products'><Products /></Suspense>} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    )
}