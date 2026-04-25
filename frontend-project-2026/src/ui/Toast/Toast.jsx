import { useEffect } from 'react';
import styles from './Toast.module.css';

const VARIANT_CLASSES = {
    success: styles.success,
    error: styles.error,
    warning: styles.warning,
};

const VARIANT_ROLE = {
    success: 'status',
    warning: 'status',
    error: 'alert',
};

function SuccessIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

function ErrorIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

function WarningIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="8" x2="12" y2="13" />
            <circle cx="12" cy="17" r="0.5" fill="currentColor" />
        </svg>
    );
}

const VARIANT_ICONS = {
    success: SuccessIcon,
    error: ErrorIcon,
    warning: WarningIcon,
};

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

function Toast({ toast, onClose }) {
    const { id, variant, message, duration } = toast;

    useEffect(() => {
        if (duration <= 0) {
            return undefined;
        }
        const timer = setTimeout(() => onClose(id), duration);
        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    const Icon = VARIANT_ICONS[variant] ?? SuccessIcon;
    const variantClassName = VARIANT_CLASSES[variant] ?? styles.success;
    const role = VARIANT_ROLE[variant] ?? 'status';

    return (
        <div className={`${styles.toast} ${variantClassName}`} role={role}>
            <span className={styles.iconBadge} aria-hidden="true">
                <Icon />
            </span>

            <p className={styles.message}>{message}</p>

            <button
                type="button"
                className={styles.close}
                aria-label="Затвори известието"
                onClick={() => onClose(id)}
            >
                <CloseIcon />
            </button>
        </div>
    );
}

export default Toast;
