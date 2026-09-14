import type { ProductType } from "../types/ProductType.ts";

const products: ProductType[] = [
    {
        id: 1,
        name: "Ноутбук Lenovo IdeaPad",
        price: 24999,
        description: "Ноутбук Lenovo IdeaPad для работы и повседневных задач.",
        is_active: true,
        stockQty: 12,
        category_id: 1,
        images: ["laptop.png"],
    },
    {
        id: 2,
        name: "Смартфон Samsung Galaxy",
        price: 18999,
        description: "Современный смартфон Samsung Galaxy с отличным экраном.",
        is_active: true,
        stockQty: 8,
        category_id: 2,
        images: ["phone.png"],
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 12999,
        description: "Умные часы для отслеживания активности и уведомлений.",
        is_active: false,
        stockQty: 3,
        category_id: 3,
        images: ["watch.png"],
    },
];

export default products;