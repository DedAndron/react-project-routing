import { useState } from "react";

export default function Register() {
    const registUrl = import.meta.env.VITE_PATH_TO_SERVER
        +import.meta.env.VITE_PATH_TO_SERVER
        +'register';
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(
            `${registUrl}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        if (response.ok) {
            alert("Регистрация успешна!");
        } else {
            const error = await response.json();
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
                Зарегистрироваться
            </button>
        </form>
    );
}