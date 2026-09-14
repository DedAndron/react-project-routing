import ReactDOM from "react-dom/client";
import "./index.css"
import {RouterProvider} from "react-router";
import {routes} from "@/routes.tsx";
import {ProductsProvider} from "@/context/ProductsProvider.tsx";
import {AuthProvider} from "@/context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <ProductsProvider>
            <RouterProvider router={routes} />
        </ProductsProvider>
    </AuthProvider>

);