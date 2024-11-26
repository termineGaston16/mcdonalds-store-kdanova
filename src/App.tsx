import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./HEADER/Header";
import NavBar from "./HEADER/NavBar";
import { Provider } from "react-redux";
import { store } from "./REDUX/Store";
import { useState } from "react";
import { Product } from "./FIREBASE/interface";
import Products from "./PRODUCTS/Products";

export default function App() {

    const [resultLocal, setResultLocal] = useState<Product[]>([])
    const query = new QueryClient()

    return (
        <Provider store={store}>
            <QueryClientProvider client={query}>
                <BrowserRouter>

                    <Header />
                    <NavBar setResultLocal={setResultLocal} />

                    <Routes>
                        <Route path="*" element='Error 404' />

                        <Route path="/:key?" element={
                            <Products resultLocal={resultLocal} setResultLocal={setResultLocal} />
                        } />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    )
}