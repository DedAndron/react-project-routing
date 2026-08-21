import type {ProductType} from "../types/ProductType.ts";

const products:ProductType[] = [
    {
        id: 1,
        title: "Ноутбук Lenovo IdeaPad",
        price: 24999,
        is_active: true,
        image: "laptop.png",
        count: 12,
        id_category: 1,
    },
    {
        id: 2,
        title: "Смартфон Samsung Galaxy",
        price: 18999,
        is_active: true,
        image: "phone.png",
        count: 8,
        id_category: 2,
    },
    {
        id: 3,
        title: "Smart Watch",
        price: 12999,
        is_active: false,
        image: "watch.png",
        count: 3,
        id_category: 3,
    },
];
export default products;