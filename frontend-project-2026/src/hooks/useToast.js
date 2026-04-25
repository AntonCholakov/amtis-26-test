import { useContext, useMemo } from 'react';
import { ToastContext } from '../ui/Toast/ToastContext';

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    const { showToast } = context;

    return useMemo(
        () => ({
            success: (message, options) => showToast({ ...options, variant: 'success', message }),
            error: (message, options) => showToast({ ...options, variant: 'error', message }),
            warning: (message, options) => showToast({ ...options, variant: 'warning', message }),
        }),
        [showToast],
    );
}
