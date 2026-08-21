import { Link, useRouteError } from "react-router";

export default function Error() {
    const error = useRouteError() as {
        status?: number;
        statusText?: string;
        message?: string;
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
                <h1 className="mb-2 text-6xl font-bold text-red-500">Oops!</h1>

                <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                    Щось пішло не так
                </h2>

                <p className="mb-2 text-gray-600">
                    {error?.status
                        ? `${error.status} ${error.statusText}`
                        : error?.message || "Сталася невідома помилка."}
                </p>

                <p className="mb-6 text-sm text-gray-500">
                    Спробуйте повернутися на головну сторінку.
                </p>

                <Link
                    to="/"
                    className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                    На головну
                </Link>
            </div>
        </div>
    );
}
