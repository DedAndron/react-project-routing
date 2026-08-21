import type {ProductType} from "../../../types/ProductType.ts";


const Product = (prop:{product:ProductType})=>{
    const{id, title, image,is_active,id_category,count, price} = prop.product;
    return (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
                src={image}
                alt={title}
                className="w-full h-40 object-contain bg-gray-100"
            />

            <div className="p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">
                        {title}
                    </h2>

                    <span
                        className={`self-start px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                            is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
        {is_active ? "Активний" : "Неактивний"}
      </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                        <span>ID:</span>
                        <span className="font-medium">{id}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Категорія:</span>
                        <span className="font-medium">{id_category}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Кількість:</span>
                        <span className="font-medium">{count} шт.</span>
                    </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-2xl sm:text-3xl font-bold text-blue-600">
        {price} ₴
      </span>

                    <button className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition">
                        Купити
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Product