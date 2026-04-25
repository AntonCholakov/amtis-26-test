import { useCallback, useMemo, useState } from 'react';
import { ToastContext } from './ToastContext';
import ToastContainer from './ToastContainer';

const MAX_VISIBLE_TOASTS = 4;
const DEFAULT_DURATION_MS = 4000;

function createToastId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback(({ variant = 'success', message, duration = DEFAULT_DURATION_MS }) => {
        const id = createToastId();
        setToasts((current) => {
            const next = [...current, { id, variant, message, duration }];
            return next.length > MAX_VISIBLE_TOASTS ? next.slice(-MAX_VISIBLE_TOASTS) : next;
        });
        return id;
    }, []);

    const contextValue = useMemo(
        () => ({ showToast, removeToast }),
        [showToast, removeToast],
    );

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastContainer toasts={toasts} onClose={removeToast} />
        </ToastContext.Provider>
    );
}

export default ToastProvider;
