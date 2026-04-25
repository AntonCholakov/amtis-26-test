import { useEffect, useState } from 'react';
import ActivityCard from '../../activities/ActivityCard/ActivityCard';
import { getActivities } from '../../../api/activitiesApi';
import Loader from '../../../ui/Loader/Loader';
import styles from './ActivitiesSection.module.css';

const PREVIEW_LIMIT = 4;

// Backend `cardImage` paths point to assets we don't bundle yet (e.g.
// `/park-cleaning-card.jpg`). Map by activity id to the locally-downloaded
// preview images so the home preview stays visual until those backend assets
// land in /public.
const cardImageById = {
    1: '/activity-three.png',
    2: '/activity-one.png',
    3: '/activity-two.png',
    4: '/activity-four.png',
};

function ActivitiesSection() {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const loadActivities = async () => {
            try {
                const data = await getActivities();
                if (!cancelled) {
                    setActivities(data);
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

        loadActivities();

        return () => {
            cancelled = true;
        };
    }, []);

    const previewActivities = activities.slice(0, PREVIEW_LIMIT);

    return (
        <section id="activities" className={`container ${styles.section}`}>
            <div className={styles.headerGroup}>
                <p className={`section-tagline ${styles.taglineColor}`}>Общността в действие</p>
                <h2 className={`section-title ${styles.titleColor}`}>Активности</h2>
            </div>

            {isLoading && <Loader label="Зареждане на активности…" />}

            {error && !isLoading && (
                <p className={styles.stateMessage}>
                    Грешка при зареждане. Опитайте отново по-късно.
                </p>
            )}

            {!isLoading && !error && previewActivities.length === 0 && (
                <p className={styles.stateMessage}>Все още няма активности.</p>
            )}

            {!isLoading && !error && previewActivities.length > 0 && (
                <ul className={styles.cardGrid}>
                    {previewActivities.map((activity, index) => (
                        <li key={activity.id} className={styles.cardItem}>
                            <ActivityCard
                                activity={{
                                    ...activity,
                                    cardImage: cardImageById[activity.id] ?? activity.cardImage,
                                }}
                                featured={index === 0}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default ActivitiesSection;
