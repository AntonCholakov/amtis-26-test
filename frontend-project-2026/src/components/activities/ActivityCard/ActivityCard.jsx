import { Link } from 'react-router-dom';
import styles from './ActivityCard.module.css';

const typeEmojiMap = {
    'Дискусия': '💬',
    'Инициатива': '🌳',
    'Кампания': '📣',
    'Доброволчество': '🤝',
};

function pluralizeOpinions(count) {
    return count === 1 ? 'мнение' : 'мнения';
}

function ActivityCard({ activity, featured = false }) {
    const { id, type, commentsCount, title, shortDescription, cardImage } = activity;
    const emoji = typeEmojiMap[type] ?? '';

    const cardClassName = featured ? `${styles.card} ${styles.cardFeatured}` : styles.card;

    return (
        <article className={cardClassName}>
            <div className={styles.top}>
                <div className={styles.tagRow}>
                    <span className={styles.tag}>{emoji} {type}</span>
                    <span className={styles.tag}>{commentsCount} {pluralizeOpinions(commentsCount)}</span>
                </div>

                <div className={styles.body}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{shortDescription}</p>
                </div>
            </div>

            <div className={styles.imageWrap}>
                <picture>
                    <source srcSet={cardImage} />
                    <img src={cardImage} alt={title} className={styles.image} />
                </picture>

                <Link to={`/activities/${id}`} className={styles.cta}>
                    <span className={styles.ctaLabel}>Виж повече</span>
                    <span className={styles.ctaArrow}>
                        <picture>
                            <source srcSet="/arrow.svg" />
                            <img src="/arrow.svg" alt="" />
                        </picture>
                    </span>
                </Link>
            </div>
        </article>
    );
}

export default ActivityCard;
