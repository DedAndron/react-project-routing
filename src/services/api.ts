const removeTrailingSlashes = (value: string) =>
    value.replace(/\/+$/, "");

const addTrailingSlash = (value: string) =>
    `${removeTrailingSlashes(value)}/`;

const addLeadingSlash = (value: string) =>
    value.startsWith("/") || /^https?:\/\//i.test(value)
        ? value
        : `/${value}`;

export const apiBaseUrl = addTrailingSlash(
    addLeadingSlash(
        import.meta.env.VITE_API_URL ?? "/api/v1/"
    )
);

const serverUrl = removeTrailingSlashes(
    import.meta.env.VITE_ASSETS_URL ??
    import.meta.env.VITE_PATH_TO_SERVER ??
    "https://localhost:7261"
);

export const apiUrl = (path: string) =>
    `${apiBaseUrl}${path.replace(/^\/+/, "")}`;

export const assetUrl = (
    path?: string,
    folder?: "categories" | "products"
) => {
    if (!path) {
        return "";
    }

    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    const normalizedPath = path.replace(/^\/+/, "");

    return folder
        ? `${serverUrl}/${folder}/${normalizedPath}`
        : `${serverUrl}/${normalizedPath}`;
};

export const getErrorMessage = async (
    response: Response,
    fallback: string
) => {
    try {
        const body = await response.json() as {
            message?: string;
            error?: string;
            title?: string;
            errors?: Record<string, string[]>;
        };

        const validationError =
            body.errors &&
            Object.values(body.errors).flat()[0];

        return (
            validationError ??
            body.message ??
            body.error ??
            body.title ??
            fallback
        );
    } catch {
        return fallback;
    }
};