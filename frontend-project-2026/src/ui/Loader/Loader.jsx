import styles from './Loader.module.css';

const sizeClassName = {
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg,
};

function Loader({ size = 'md', label, inline = false }) {
    const wrapperClassName = inline ? `${styles.wrapper} ${styles.wrapperInline}` : styles.wrapper;
    const spinnerClassName = `${styles.spinner} ${sizeClassName[size] ?? styles.md}`;

    return (
        <span role="status" aria-live="polite" className={wrapperClassName}>
            <span aria-hidden="true" className={spinnerClassName} />
            {label ? (
                <span className={styles.label}>{label}</span>
            ) : (
                <span className={styles.visuallyHidden}>Зареждане…</span>
            )}
        </span>
    );
}

export default Loader;
