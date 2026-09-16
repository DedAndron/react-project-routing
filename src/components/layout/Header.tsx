import { NavLink } from "react-router";
import AppRoutes from "@/enums/AppRoutes.ts";
import Search from "@/components/layout/Search.tsx";
import { useAuth } from "@/context/AuthContext.tsx";

const Header = () => {
    const { user, logout } = useAuth();

    const menu = [
        { title: "Home", path: AppRoutes.HOME},
        { title: "Categories", path: AppRoutes.CATEGORIES },
        { title: "Products", path: AppRoutes.PRODUCTS },
        { title: "Add product", path: AppRoutes.CREATE_PRODUCT },
        { title: "Add category", path: AppRoutes.CREATE_CATEGORY },
        { title: "About", path: AppRoutes.ABOUT },
        { title: "Contacts", path: "contacts" },
        ...(!user ? [
            { title: "Register", path: AppRoutes.REGISTER },
            { title: "Login", path: AppRoutes.LOGIN },
        ] : [])
    ];

    return (
        <header className="bg-slate-900 text-white shadow-lg">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                <NavLink
                    to={menu[0].path}
                    className="text-2xl font-bold tracking-wide"
                >
                    MyShop
                </NavLink>

                <nav className="flex gap-6">

                    {menu.map(item => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `transition hover:text-blue-400 ${
                                    isActive
                                        ? "text-blue-400"
                                        : "text-white"
                                }`
                            }
                        >
                            {item.title}
                        </NavLink>

                    ))}

                </nav>
                <div className="flex items-center gap-4">
                    <Search />

                    <button>❤️</button>

                    <button className="relative">
                        🛒
                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs">
      3
    </span>
                    </button>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="hidden text-sm font-medium text-blue-200 lg:inline">Welcome, {user.email}</span>
                            <button
                                className="rounded-md border border-slate-600 px-3 py-1 text-sm transition hover:border-blue-400 hover:text-blue-300"
                                onClick={logout}
                                type="button"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <NavLink className="text-xl transition hover:text-blue-400" to={AppRoutes.LOGIN} aria-label="Login">👤</NavLink>
                    )}
                </div>

            </div>

        </header>
    );
};

export default Header;