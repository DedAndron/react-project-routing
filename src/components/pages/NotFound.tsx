import { NavLink } from "react-router";

const NotFound = () => {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">

            <h1 className="text-8xl font-extrabold text-blue-600">
                404
            </h1>

            <h2 className="mt-4 text-3xl font-bold text-gray-800">
                Oops! Page not found
            </h2>

            <p className="mt-3 max-w-lg text-lg text-gray-500">
                The page you are looking for may have been removed,
                renamed, or is temporarily unavailable.
            </p>

            <div className="mt-10 flex gap-4">

                <NavLink
                    to="/"
                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    🏠 Home
                </NavLink>

                <NavLink
                    to="/categories"
                    className="rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                    📂 Categories
                </NavLink>

            </div>

            <div className="mt-12 text-8xl animate-bounce">
                🛒
            </div>

        </div>
    );
};

export default NotFound;