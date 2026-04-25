import styles from './ToolsSection.module.css';

const featureCards = [
    {
        icon: '/comment.svg',
        title: 'Дискусии',
        description: 'Изразявай мнение и обменяй идеи с млади хора от цялата страна.',
    },
    {
        icon: '/checkbox.svg',
        title: 'Гласуване',
        description: 'Участвай в анкети по важни теми и виж какво мислят другите.',
    },
    {
        icon: '/rocket.svg',
        title: 'Инициативи',
        description: 'Включвай се в кампании, събития и каузи, организирани от общността.',
    },
    {
        icon: '/heart.svg',
        title: 'Доброволчество',
        description: 'Помагай в реални каузи и стани част от мрежата на промяната.',
    },
];

function ToolsSection() {
    return (
        <section id="opportunities" className={`container ${styles.section}`}>
            <div className={styles.headerGroup}>
                <p className={`section-tagline ${styles.taglineColor}`}>Инструменти</p>
                <h2 className={`section-title ${styles.titleColor}`}>Какво можеш да правиш тук?</h2>
            </div>

            <div className={styles.gridContainer}>
                <article className={styles.featuredCard}>
                    <div className={styles.featuredContent}>
                        <span className={styles.iconBadge}>
                            <picture>
                                <source srcSet="/user-add.svg" />
                                <img src="/user-add.svg" alt="" className={styles.icon} />
                            </picture>
                        </span>
                        <h3 className={styles.featuredTitle}>Подай сигнал</h3>
                        <p className={styles.featuredDescription}>
                            Забеляза проблем около теб? Сигнализирай и помогни да бъде решен. Твоят сигнал може да направи реална разлика в общността.
                        </p>
                    </div>
                    <div className={styles.featuredImageCard}>
                        <picture>
                            <source srcSet="/unsplash_x2j6lj09DhM.jpg" />
                            <img src="/unsplash_x2j6lj09DhM.jpg" alt="Подаване на сигнал" className={styles.featuredImage} />
                        </picture>
                    </div>
                </article>

                <ul className={styles.cardGrid}>
                    {featureCards.map(({ icon, title, description }) => (
                        <li key={title} className={styles.card}>
                            <span className={styles.iconBadge}>
                                <picture>
                                    <source srcSet={icon} />
                                    <img src={icon} alt="" className={styles.icon} />
                                </picture>
                            </span>
                            <h3 className={styles.cardTitle}>{title}</h3>
                            <p className={styles.cardDescription}>{description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default ToolsSection;
