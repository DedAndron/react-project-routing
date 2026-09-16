import type { AuthResponse, AuthTokens } from "@/types/Auth.ts";
import { apiUrl, getErrorMessage } from "@/services/api.ts";

const request = async <T>(path: string, body: T): Promise<AuthTokens> => {
    const response = await fetch(apiUrl(`auth/${path}`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "Не вдалося виконати запит."));
    }

    const data = await response.json() as AuthResponse;
    const accessToken = data.accessToken ?? data.access_token ?? data.token;

    if (!accessToken) {
        throw new Error("The server response does not include an access token.");
    }

    return {
        accessToken,
        refreshToken: data.refreshToken ?? data.refresh_token,
    };
};

export const registerUser = (email: string, password: string, repeat_password: string) =>
    request("register", { email, password, repeatPassword: repeat_password });

export const loginUser = (email: string, password: string) =>
    request("login", { email, password });