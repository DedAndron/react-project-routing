// import { useState } from "react";
//
// export default function Register() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//
//     const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
//         event.preventDefault();
//
//         setError("");
//         setSuccess("");
//
//         if (!email || !password || !confirmPassword) {
//             setError("Заповніть усі поля");
//             return;
//         }
//
//         if (password.length < 6) {
//             setError("Пароль повинен містити щонайменше 6 символів");
//             return;
//         }
//
//         if (password !== confirmPassword) {
//             setError("Паролі не збігаються");
//             return;
//         }
//
//         setSuccess("Реєстрація успішна!");
//
//         console.log({
//             email,
//             password,
//         });
//     };
//
//     return (
//         <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
//             <form
//                 onSubmit={handleSubmit}
//                 className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-lg"
//             >
//                 {/* Заголовок */}
//                 <div className="text-center">
//                     <h1 className="text-2xl font-bold text-gray-900">
//                         Реєстрація
//                     </h1>
//
//                     <p className="mt-2 text-sm text-gray-500">
//                         Створіть новий акаунт
//                     </p>
//                 </div>
//
//                 {/* Помилка */}
//                 {error && (
//                     <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
//                         {error}
//                     </div>
//                 )}
//
//                 {/* Успіх */}
//                 {success && (
//                     <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
//                         {success}
//                     </div>
//                 )}
//
//                 {/* Email */}
//                 <div>
//                     <label
//                         htmlFor="email"
//                         className="mb-2 block text-sm font-medium text-gray-700"
//                     >
//                         Email
//                     </label>
//
//                     <input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={email}
//                         onChange={(event) => setEmail(event.target.value)}
//                         placeholder="example@email.com"
//                         autoComplete="email"
//                         className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//                     />
//                 </div>
//
//                 {/* Пароль */}
//                 <div>
//                     <label
//                         htmlFor="password"
//                         className="mb-2 block text-sm font-medium text-gray-700"
//                     >
//                         Пароль
//                     </label>
//
//                     <input
//                         id="password"
//                         name="password"
//                         type="password"
//                         value={password}
//                         onChange={(event) => setPassword(event.target.value)}
//                         placeholder="••••••••"
//                         autoComplete="new-password"
//                         className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//                     />
//                 </div>
//
//                 {/* Підтвердження пароля */}
//                 <div>
//                     <label
//                         htmlFor="confirmPassword"
//                         className="mb-2 block text-sm font-medium text-gray-700"
//                     >
//                         Підтвердження пароля
//                     </label>
//
//                     <input
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         type="password"
//                         value={confirmPassword}
//                         onChange={(event) => setConfirmPassword(event.target.value)}
//                         placeholder="••••••••"
//                         autoComplete="new-password"
//                         className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//                     />
//                 </div>
//
//                 {/* Кнопка */}
//                 <button
//                     type="submit"
//                     className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                     Зареєструватися
//                 </button>
//             </form>
//         </div>
//     );
// }
import { useForm, type SubmitHandler } from "react-hook-form";

type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};
export default function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>({
        defaultValues: {
            email: "test@gmail.com",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
        console.log(data);
    };

    const validateEmail = (value: string) => {
        return value.length === 12 || "Email must be at least 12 characters long";
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email:</label>

                <input
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        validate: validateEmail,
                    })}
                />
                {errors.email && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
                )}
                <br />
                <label htmlFor="password">Password:</label>

                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long",
                        },
                    })}
                />
                {errors.password && (
                    <span style={{ color: "red" }}>{errors.password.message}</span>
                )}
                <br />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    {...register("confirmPassword", {
                        required: "Confirm Password is required",
                    })}
                />
                {errors.confirmPassword && (
                    <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
                )}
                <br />
                <button type="submit">Register</button>
            </form>
            {/* {errors && console.log(errors)} */}
            Data: {watch("email")}
        </>
    );
}