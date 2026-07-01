import { createContext, useContext, useState, useCallback } from "react";
import "./Toast.css";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = "success") => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 2500);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="toast-container">
                {toasts.map((t) => (
                    <div key={t.id} className={`toast toast-${t.type}`}>
                        <span className="toast-check">
                            {t.type === "success" ? "✓" : "!"}
                        </span>
                        <span>{t.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}