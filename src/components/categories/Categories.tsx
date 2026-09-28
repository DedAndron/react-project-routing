import {categoryStore} from "@/store/categoryStore.ts";
import {useEffect} from "react";

export const Categories = () => {
    const categories = categoryStore((state) => state.categories);
    const loading = categoryStore((state) => state.loading);
    const error = categoryStore((state) => state.error);
    const getCategories = categoryStore((state) => state.getCategories);
    useEffect(() => {
        console.log('Categories loaded');
        getCategories();
    }, []);
    if (loading) {
        return <>Loading...</>;
    }
    if (error!=null) {
        console.error('Error:', error);
    }
    return (
        <>{categories.map((c)=>(
            <p key={c.id}>
                {c.name} {c.slug}
            </p>
        ))}
        </>
    )
}