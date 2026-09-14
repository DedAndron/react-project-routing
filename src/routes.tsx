import { createBrowserRouter } from "react-router";
import Layout from "@/components/layout/Layout.tsx";
import Home from "@/components/pages/Home.tsx";
//import About from "@/components/pages/About.tsx";
import CategoriesList from "@/components/categories/CategoriesList.tsx";
import CategoryDetail from "@/components/categories/CategoryDetail.tsx";
import NotFoundPage from "@/components/pages/NotFound.tsx";
import ProductsList from "@/components/test/product/ProductsList.tsx";
import Error from "@/components/pages/Error.tsx";
import AppRoutes from "@/enums/AppRoutes.ts";
import Register from "@/components/pages/Register.tsx";
import Authorizer from "@/components/pages/Authorizer.tsx";

export const routes = createBrowserRouter([
    {
        path: AppRoutes.HOME,
        element: <Layout />,
        errorElement:<Error/>,
        children: [
            {
                index: true,
                Component:Home
            },
            {
                path:  `${AppRoutes.SUBCATEGORIES}/:id`, //params
                Component: CategoriesList,
            },
            {
                path: AppRoutes.CATEGORIES,
                Component: CategoriesList
            },
            {
                path: AppRoutes.ABOUT,
                //Component: About
                lazy:async () => {
                        const module = await import('@/components/pages/About.tsx');
        return {
            Component: module.default,
        };
},
            },
            {
                path:AppRoutes.PRODUCTS,
                Component:ProductsList
            },
            {
                path: `${AppRoutes.CATEGORIES}/:slug`,
                Component:CategoryDetail
            },
            {
                path:AppRoutes.SEARCH,
                Component:CategoriesList
            },
            {
                path:AppRoutes.REGISTER,
                Component:Register
            },
            {
                path:AppRoutes.LOGIN,
                Component:Authorizer
            },
            {
                path: "*",
                Component:NotFoundPage
            },
        ],
    },
]);
