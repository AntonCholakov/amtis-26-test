import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose, ariaLabel, children }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) {
            return;
        }
        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    const handleBackdropClick = (event) => {
        if (event.target === dialogRef.current) {
            onClose();
        }
    };

    const handleNativeClose = () => {
        if (isOpen) {
            onClose();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className={styles.dialog}
            aria-label={ariaLabel}
            onClick={handleBackdropClick}
            onClose={handleNativeClose}
        >
            {children}
        </dialog>
    );
}

export default Modal;
