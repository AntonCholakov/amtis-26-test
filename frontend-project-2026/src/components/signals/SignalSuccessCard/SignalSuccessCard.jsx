import styles from './SignalSuccessCard.module.css';

function SignalSuccessCard({ onClose }) {
    return (
        <section className={styles.card} aria-live="polite">
            <p className={styles.eyebrow}>Публикуване на сигнал</p>
            <h2 className={styles.title}>Благодарим ВИ!</h2>
            <p className={styles.description}>Вашият сигнал е публикуван успешно!</p>
            <button type="button" className={styles.button} onClick={onClose}>
                Чудесно!
            </button>
        </section>
    );
}

export default SignalSuccessCard;
