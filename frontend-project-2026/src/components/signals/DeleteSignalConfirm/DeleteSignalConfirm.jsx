import styles from './DeleteSignalConfirm.module.css';

function DeleteSignalConfirm({ isSubmitting, onConfirm, onCancel }) {
    return (
        <section className={styles.card} aria-live="polite">
            <div className={styles.copy}>
                <p className={styles.eyebrow}>Изтриване на сигнал</p>
                <h2 className={styles.title}>Сигурни ли сте, че искате да изтриете този сигнал?</h2>
                <p className={styles.description}>Това действие е необратимо.</p>
            </div>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.confirmButton}
                    onClick={onConfirm}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Изтриване...' : 'Да, изтрий го!'}
                </button>
                <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Не! Затвори прозореца
                </button>
            </div>
        </section>
    );
}

export default DeleteSignalConfirm;
