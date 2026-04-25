import styles from './AboutSection.module.css';

const featureCards = [
    { icon: '/comment.svg', label: 'Обсъждаш важни теми' },
    { icon: '/user-add.svg', label: 'Участваш в инициативи' },
    { icon: '/rocket.svg', label: 'Действаш по реални проблеми' },
];

function AboutSection() {
    return (
        <section id="about" className={`container ${styles.section}`}>
            <div className={styles.container}>
                <div className={styles.leftCol}>
                    <div className={styles.headerGroup}>
                        <p className={`section-tagline ${styles.taglineColor}`}>За платформата</p>
                        <h2 className={`section-title ${styles.titleColor}`}>Какво е <span className={styles.brandText}>Глас Мога</span>?</h2>
                    </div>
                    <p className={styles.description}>
                        <span className={styles.brandText}>Глас Мога</span> е дигитална платформа, която дава възможност на младите хора да участват активно в обществения живот. Тук можеш да изразяваш мнение, да подкрепяш каузи и да предприемаш реални действия.
                    </p>
                </div>

                <ul className={styles.featureList}>
                    {featureCards.map(({ icon, label }) => (
                        <li key={label} className={styles.featureCard}>
                            <span className={styles.iconBadge}>
                                <picture>
                                    <source srcSet={icon} />
                                    <img src={icon} alt="" className={styles.icon} />
                                </picture>
                            </span>
                            <p className={styles.label}>{label}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default AboutSection;
