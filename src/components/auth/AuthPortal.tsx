import { createPortal } from "react-dom";
import type { PropsWithChildren } from "react";

type AuthPortalProps = PropsWithChildren<{
    title: string;
    onClose: () => void;
}>;

const AuthPortal = ({ children, title, onClose }: AuthPortalProps) =>
    createPortal(
        <div
            aria-label="Close authentication dialog"
            className="auth-backdrop"
            onMouseDown={onClose}
            role="presentation"
        >
            <section
                aria-labelledby="auth-dialog-title"
                aria-modal="true"
                className="auth-dialog"
                onMouseDown={(event) => event.stopPropagation()}
                role="dialog"
            >
                <button aria-label="Close" className="auth-close" onClick={onClose} type="button">×</button>
                <h1 className="text-2xl font-bold text-slate-900" id="auth-dialog-title">{title}</h1>
                {children}
            </section>
        </div>,
        document.body,
    );

export default AuthPortal;