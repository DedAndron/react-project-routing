import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext.tsx";
import { registerUser } from "@/services/auth.ts";

type RegisterFormData = {
    email: string;
    password: string;
    repeat_password: string;
};

export default function Register() {
    const navigate = useNavigate();
    const { saveSession } = useAuth();
    const [serverError, setServerError] = useState("");
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>();

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        setServerError("");

        try {
            const tokens = await registerUser(data.email, data.password, data.repeat_password);
            saveSession(data.email, tokens);
            navigate("/");
        } catch (error) {
            setServerError(error instanceof Error ? error.message : "Registration failed. Please try again.");
        }
    };

    return (
        <section className="mx-auto max-w-md rounded-xl bg-white p-8 shadow">
            <h1 className="text-2xl font-bold text-slate-900">Create an account</h1>
            <p className="mt-2 text-sm text-slate-600">Register to continue shopping.</p>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormField label="Email" error={errors.email?.message}>
                    <input id="email" type="email" autoComplete="email" className="auth-input" {...register("email", { required: "Email is required" })} />
                </FormField>
                <FormField label="Password" error={errors.password?.message}>
                    <input id="password" type="password" autoComplete="new-password" className="auth-input" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })} />
                </FormField>
                <FormField label="Repeat password" error={errors.repeat_password?.message}>
                    <input id="repeat_password" type="password" autoComplete="new-password" className="auth-input" {...register("repeat_password", { required: "Please repeat your password", validate: value => value === getValues("password") || "Passwords do not match" })} />
                </FormField>
                {serverError && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">{serverError}</p>}
                <button className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating account..." : "Register"}
                </button>
            </form>
        </section>
    );
}

type FormFieldProps = { label: string; error?: string; children: import("react").ReactNode };
const FormField = ({ label, error, children }: FormFieldProps) => (
    <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor={label.toLowerCase().replace(" ", "_")}>{label}</label>
        {children}
        {error && <p className="mt-1 text-sm text-red-600" role="alert">{error}</p>}
    </div>
);