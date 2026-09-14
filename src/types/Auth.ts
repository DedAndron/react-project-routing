export type AuthTokens = {
    accessToken: string;
    refreshToken?: string;
};

export type AuthUser = {
    email: string;
};

export type AuthResponse = {
    accessToken?: string;
    access_token?: string;
    refreshToken?: string;
    refresh_token?: string;
    token?: string;
};