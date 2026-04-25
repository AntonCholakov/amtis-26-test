import { useEffect, useState } from 'react';
import { getStats } from '../../../api/statsApi';
import Loader from '../../../ui/Loader/Loader';
import styles from './StoriesSection.module.css';

const stories = [
    {
        icon: '🌳',
        title: 'Почистване с 50+ доброволци',
        description: 'Организирахме акция по почистване на парк и събрахме над 50 доброволци от квартала. Резултатът — чиста и зелена среда за всички.',
    },
    {
        icon: '🛝',
        title: 'Ремонт на детска площадка',
        description: 'Подаден сигнал доведе до официален отговор от общината и ремонт на детска площадка в рамките на 3 седмици.',
    },
];

const statFigures = [
    {
        key: 'totalParticipants',
        icon: '/participants.svg',
        label: 'Участници в платформата',
        size: 'small',
    },
    {
        key: 'realizedInitiatives',
        icon: '/initiatives.svg',
        label: 'Реализирани инициативи',
        size: 'large',
    },
    {
        key: 'resolvedSignals',
        icon: '/solved-signals.svg',
        label: 'Решени сигнала',
        size: 'small',
    },
];

function StoriesSection() {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const loadStats = async () => {
            try {
                const data = await getStats();
                if (!cancelled) {
                    setStats(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err);
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        loadStats();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <section id="stories" className={`container ${styles.section}`}>
            <div className={styles.header}>
                <p className={styles.tagline}>Реални резултати</p>
                <h2 className={styles.title}>Истории и резултати</h2>
            </div>

            <div className={styles.contentWrap}>
                <div className={styles.storiesRow}>
                    {stories.map(({ icon, title, description }) => (
                        <article key={title} className={styles.storyCard}>
                            <div className={styles.storyIcon} aria-hidden="true">{icon}</div>
                            <div className={styles.storyContent}>
                                <h3 className={styles.storyTitle}>{title}</h3>
                                <p className={styles.storyDesc}>{description}</p>
                            </div>
                        </article>
                    ))}
                </div>

                {isLoading && <Loader label="Зареждане на статистики…" />}

                {error && !isLoading && (
                    <p className={styles.stateMessage}>
                        Грешка при зареждане на статистиките. Опитайте отново по-късно.
                    </p>
                )}

                {!isLoading && !error && stats && (
                    <div className={styles.statsRow}>
                        {statFigures.map(({ key, icon, label, size }) => {
                            const sizeClass = size === 'large' ? styles.statCardLarge : styles.statCardSmall;
                            return (
                                <article key={key} className={`${styles.statCard} ${sizeClass}`}>
                                    <div className={styles.statImageWrapper}>
                                        <picture>
                                            <source srcSet={icon} />
                                            <img src={icon} alt="" className={styles.statImage} />
                                        </picture>
                                    </div>
                                    <p className={styles.statNumber}>{stats[key]}</p>
                                    <p className={styles.statLabel}>{label}</p>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

export default StoriesSection;
