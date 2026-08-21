import { Outlet } from "react-router";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {

    return (

        <div className="flex min-h-screen flex-col bg-gray-100">

            <Header />

            <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">

                <Outlet />

            </main>

            <Footer />

        </div>

    );
};

export default Layout;