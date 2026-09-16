const removeTrailingSlashes = (value: string) => value.replace(/\/+$/, "");
const addTrailingSlash = (value: string) => `${removeTrailingSlashes(value)}/`;
const addLeadingSlash = (value: string) => value.startsWith("/") || /^https?:\/\//i.test(value) ? value : `/${value}`;

/**
 * API requests use Vite's same-origin proxy by default. This avoids a CORS
 * preflight during local development; deployments can set VITE_API_URL to the
 * public API URL instead.
 */
export const apiBaseUrl = addTrailingSlash(addLeadingSlash(
    import.meta.env.VITE_API_URL
    ?? (import.meta.env.VITE_PATH_TO_SERVER && import.meta.env.VITE_PATH_TO_API
        ? `${import.meta.env.VITE_PATH_TO_SERVER}${import.meta.env.VITE_PATH_TO_API}`
        : "/api/v1/"),
));

const serverUrl = removeTrailingSlashes(
    import.meta.env.VITE_ASSETS_URL ?? import.meta.env.VITE_PATH_TO_SERVER ?? "",
);

export const apiUrl = (path: string) => `${apiBaseUrl}${path.replace(/^\/+/, "")}`;

export const assetUrl = (path?: string) => {
    if (!path) {
        return "";
    }

    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    return serverUrl ? `${serverUrl}/${path.replace(/^\/+/, "")}` : `/${path.replace(/^\/+/, "")}`;
};

export const getErrorMessage = async (response: Response, fallback: string) => {
    try {
        const body = await response.json() as { message?: string; error?: string; title?: string; errors?: Record<string, string[]> };
        const validationError = body.errors && Object.values(body.errors).flat()[0];
        return validationError ?? body.message ?? body.error ?? body.title ?? fallback;
    } catch {
        return fallback;
    }
};