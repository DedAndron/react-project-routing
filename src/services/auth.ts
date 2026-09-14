import type { AuthResponse, AuthTokens } from "@/types/Auth.ts";

const apiBaseUrl = `${import.meta.env.VITE_PATH_TO_SERVER}${import.meta.env.VITE_PATH_TO_API}`;

const getErrorMessage = async (response: Response) => {
    try {
        const body = await response.json() as { message?: string; error?: string };
        return body.message ?? body.error ?? "The request could not be completed.";
    } catch {
        return "The request could not be completed.";
    }
};

const request = async <T>(path: string, body: T): Promise<AuthTokens> => {
    const response = await fetch(`${apiBaseUrl}auth/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response));
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
    request("register", { email, password, repeat_password });

export const loginUser = (email: string, password: string) =>
    request("login", { email, password });