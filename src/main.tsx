import ReactDOM from "react-dom/client";
import "./index.css"
import {RouterProvider} from "react-router";
import {routes} from "@/routes.tsx";
import {ProductsProvider} from "@/context/ProductsProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ProductsProvider>
        <RouterProvider router={routes}>
        </RouterProvider>
     </ProductsProvider>

);