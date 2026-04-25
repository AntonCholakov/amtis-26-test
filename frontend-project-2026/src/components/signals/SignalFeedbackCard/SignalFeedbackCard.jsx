import styles from './SignalFeedbackCard.module.css';

const variantPresets = {
    'create-success': {
        eyebrow: 'Публикуване на сигнал',
        title: 'Благодарим ВИ!',
        description: 'Вашият сигнал е публикуван успешно!',
        buttonLabel: 'Чудесно!',
        tone: 'success',
    },
    'edit-success': {
        eyebrow: 'Редактиране на сигнал',
        title: 'Сигнала е редактиран успешно!',
        description: 'Вашият сигнал е редактиран и публикуван в потока със сигнали!',
        buttonLabel: 'Чудесно!',
        tone: 'success',
    },
    'edit-error': {
        eyebrow: 'Вашият сигнал не е запазен',
        title: 'Възникна проблем!',
        description: 'Вашият сигнал не е редактиран. Възникна проблем при редакцията му.',
        buttonLabel: 'Затвори',
        tone: 'error',
    },
};

function SignalFeedbackCard({ variant, onClose }) {
    const preset = variantPresets[variant] ?? variantPresets['create-success'];
    const cardClassName = preset.tone === 'error'
        ? `${styles.card} ${styles.cardError}`
        : styles.card;
    const titleClassName = preset.tone === 'error'
        ? `${styles.title} ${styles.titleError}`
        : styles.title;

    return (
        <section className={cardClassName} aria-live="polite">
            <p className={styles.eyebrow}>{preset.eyebrow}</p>
            <h2 className={titleClassName}>{preset.title}</h2>
            <p className={styles.description}>{preset.description}</p>
            <button type="button" className={styles.button} onClick={onClose}>
                {preset.buttonLabel}
            </button>
        </section>
    );
}

export default SignalFeedbackCard;
