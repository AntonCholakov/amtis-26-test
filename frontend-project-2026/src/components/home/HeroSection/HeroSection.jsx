import styles from './HeroSection.module.css';

function HeroSection({ onOpenSignalModal }) {
    return (
        <section className={`container ${styles.heroWrapper}`}>

            <div className={styles.heroTopRow}>
                

                <div className={styles.mainCol}>
                    <div className={styles.introCard}>
                        <div className={styles.introCardImage}>
                            <img src="/quotes.svg" alt="Кавички" />
                        </div>
                        <p className={styles.badge}>Платформа за гражданско участие</p>
                        <h1 className={styles.title}>
                            Твоят глас<br />има значение.
                        </h1>
                        <p className={styles.description}>
                            Платформа за млади хора, които искат да разбират, да изразяват мнение и да действат.
                        </p>
                    </div>
                    
                    <div className={styles.statsRow}>
                        <div className={styles.statCard}>
                            <span className={styles.statNumber}>100+</span>
                            <span className={styles.statLabel}>участници</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statNumber}>30+</span>
                            <span className={styles.statLabel}>инициативи</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statNumber}>20</span>
                            <span className={styles.statLabel}>решени сигнала</span>
                        </div>
                    </div>
                </div>
                <div className={styles.imageCol}>
                    <picture>
                        <source media="(max-width: 1024px)" srcSet="/hero-image-mobile.svg" />
                        <source srcSet="/hero-image.svg" />
                        <img src="/hero-image.svg" alt="Участници в платформата" className={styles.heroImage} />
                    </picture>
                </div>
            </div>

            <div className={styles.ctaBanner}>
                <p className={styles.ctaTitle}>Готов ли си да направиш разлика?</p>
                <div className={styles.ctaActions}>
                    <button type="button" className={styles.btnPrimary} onClick={onOpenSignalModal}>
                        <span className={styles.btnLabelPrimary}>Изпрати сигнал</span>
                        <div className={styles.btnArrowWrapper}>
                            <img src="/arrow.svg" alt="" className={styles.btnArrow} />
                        </div>
                    </button>
                    <a href="#how-it-works">
                        <button type="button" className={styles.btnOutline}>
                            <span className={styles.btnLabelOutline}>Виж как работи</span>
                        </button>
                    </a>
                </div>
            </div>

            {/* CTA Banner moved to top - done*/}
        </section>
    );
}

export default HeroSection;
