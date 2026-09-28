interface ImportMetaEnv {
    readonly VITE_PATH_TO_SERVER: string;
    readonly VITE_PATH_TO_API: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}