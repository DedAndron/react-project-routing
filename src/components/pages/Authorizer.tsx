import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext.tsx";
import { loginUser } from "@/services/auth.ts";

type AuthorizerFormData = {
    email: string;
    password: string;
};

export default function Authorizer() {
    const navigate = useNavigate();
    const { saveSession } = useAuth();
    const [serverError, setServerError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AuthorizerFormData>();

    const onSubmit: SubmitHandler<AuthorizerFormData> = async (data) => {
        setServerError("");

        try {
            const tokens = await loginUser(data.email, data.password);
            saveSession(data.email, tokens);
            navigate("/");
        } catch (error) {
            setServerError(error instanceof Error ? error.message : "Login failed. Please try again.");
        }
    };

    return (
        <section className="mx-auto max-w-md rounded-xl bg-white p-8 shadow">
            <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
            <p className="mt-2 text-sm text-slate-600">Enter your account details to continue.</p>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
                    <input id="email" type="email" autoComplete="email" className="auth-input" {...register("email", { required: "Email is required" })} />
                    {errors.email && <p className="mt-1 text-sm text-red-600" role="alert">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                    <input id="password" type="password" autoComplete="current-password" className="auth-input" {...register("password", { required: "Password is required" })} />
                    {errors.password && <p className="mt-1 text-sm text-red-600" role="alert">{errors.password.message}</p>}
                </div>
                {serverError && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">{serverError}</p>}
                <button className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Login"}
                </button>
            </form>
        </section>
    );
}