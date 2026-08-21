import { createBrowserRouter } from "react-router";
import Layout from "@/components/layout/Layout.tsx";
import Error from "@/components/pages/Error.tsx";
import AppRoutes from "@/enums/AppRoutes.ts";
import {CategoriesLoader} from "@/utils/loaders/CategoriesLoader.tsx";

export const routes = createBrowserRouter([
    {
        path: AppRoutes.HOME,
        element: <Layout />,
        errorElement:<Error/>,
        children: [
            {
                index: true,

                lazy: async () => {
                    const module = await import(
                        "@/components/pages/Home.tsx"
                        );

                    return {
                        Component: module.default,
                    };
                },
            },

            {
                path: `${AppRoutes.SUBCATEGORIES}/:id`,

                lazy: async () => {
                    const module = await import(
                        "@/components/categories/CategoriesList.tsx"
                        );

                    return {
                        Component: module.default,
                        loader: CategoriesLoader,
                    };
                },
            },

            {
                path: AppRoutes.CATEGORIES,

                lazy: async () => {
                    const module = await import(
                        "@/components/categories/CategoriesList.tsx"
                        );

                    return {
                        Component: module.default,
                        loader: CategoriesLoader,
                    };
                },
            },

            {
                path: AppRoutes.ABOUT,

                lazy: async () => {
                    const module = await import(
                        "@/components/pages/About.tsx"
                        );

                    return {
                        Component: module.default,
                    };
                },
            },

            {
                path: AppRoutes.PRODUCTS,

                lazy: async () => {
                    const module = await import(
                        "@/components/test/product/ProductsList.tsx"
                        );

                    return {
                        Component: module.default,
                    };
                },
            },

            {
                path: `${AppRoutes.CATEGORIES}/:slug`,

                lazy: async () => {
                    const module = await import(
                        "@/components/categories/CategoryDetail.tsx"
                        );

                    return {
                        Component: module.default,
                    };
                },
            },

            {
                path: AppRoutes.SEARCH,

                lazy: async () => {
                    const module = await import(
                        "@/components/categories/CategoriesList.tsx"
                        );

                    return {
                        Component: module.default,
                    };
                },
            },

            {
                path: "*",

                lazy: async () => {
                    const module = await import(
                        "@/components/pages/NotFound.tsx"
                        );

                    return {
                        Component: module.default,
                    };
                },
            },
        ],
    },
]);
