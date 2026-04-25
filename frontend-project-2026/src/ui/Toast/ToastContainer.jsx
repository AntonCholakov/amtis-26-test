import { createPortal } from 'react-dom';
import Toast from './Toast';
import styles from './Toast.module.css';

function ToastContainer({ toasts, onClose }) {
    if (typeof document === 'undefined') {
        return null;
    }

    return createPortal(
        <ol className={styles.container} aria-live="polite" aria-relevant="additions">
            {toasts.map((toast) => (
                <li key={toast.id}>
                    <Toast toast={toast} onClose={onClose} />
                </li>
            ))}
        </ol>,
        document.body,
    );
}

export default ToastContainer;
