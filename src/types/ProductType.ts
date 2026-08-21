export type ProductType = {
    id: number|string,
    name:string,
    price:number,
    description:string,
    is_active: boolean,
    stockQty: number,
    category_id?:number|string,
    images:string[]
}