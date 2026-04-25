import { formatRelativeTime } from '../../../utils/formatRelativeTime';
import styles from './SignalCard.module.css';

const RESOLVED_STATUS = 'Решен';

const categoryConfig = {
    'Инфраструктура': { emoji: '🏗️', tone: 'neutral' },
    'Екология': { emoji: '🌿', tone: 'primary' },
    'Образование': { emoji: '📚', tone: 'neutral' },
    'Замърсяване': { emoji: '♻️', tone: 'neutral' },
    'Осветление': { emoji: '💡', tone: 'neutral' },
    'Транспорт': { emoji: '🚌', tone: 'neutral' },
    'Безопасност': { emoji: '⚠️', tone: 'neutral' },
};

function SignalCard({ signal, onEdit, onDelete }) {
    const isResolved = signal.status === RESOLVED_STATUS;
    const { emoji, tone } = categoryConfig[signal.category] ?? { emoji: '', tone: 'neutral' };
    const relativeTime = signal.relativeTime ?? formatRelativeTime(signal.createdAt);

    const tagClassName = tone === 'primary' ? styles.tagPrimary : styles.tagNeutral;
    const statusClassName = isResolved ? styles.statusResolved : styles.statusOpen;
    const cardClassName = isResolved ? `${styles.card} ${styles.cardResolved}` : styles.card;

    const showActions = Boolean(onEdit || onDelete);

    return (
        <article className={cardClassName}>
            <header className={styles.header}>
                <span className={`${styles.tag} ${tagClassName}`}>
                    {emoji} {signal.category}
                </span>
                <span className={`${styles.status} ${statusClassName}`}>
                    <span aria-hidden="true" className={styles.statusDot} />
                    {signal.status}
                </span>
            </header>

            <div className={styles.body}>
                <h3 className={styles.title}>{signal.title}</h3>
                <p className={styles.description}>{signal.description}</p>
            </div>

            <p className={styles.meta}>
                <span>📍 {signal.location}</span>
                <span>⏱ {relativeTime}</span>
            </p>

            {showActions && (
                <div className={styles.actions}>
                    {onEdit && (
                        <button
                            type="button"
                            className={styles.actionButton}
                            onClick={() => onEdit(signal)}
                        >
                            Редактирай
                        </button>
                    )}
                    {onDelete && (
                        <button
                            type="button"
                            className={styles.actionButton}
                            onClick={() => onDelete(signal)}
                        >
                            Изтрий
                        </button>
                    )}
                </div>
            )}
        </article>
    );
}

export default SignalCard;
