import styles from './TargetAudienceSection.module.css';



function TargetAudienceSection() {
    return (
        <section id="audience" className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <p className={`section-tagline ${styles.taglineColor}`}>Аудитория</p>
                    <h2 className={`section-title ${styles.titleColor}`}>За кого е ГЛАС МОГА?</h2>
                </div>
                
                <div className={styles.cardsWrapper}>
                    <div className={styles.cardRow}>
                        <div className={`${styles.card} ${styles.cardPrimary}`}>
                            <div className={styles.iconWrapperDark}>
                                <img src="/graduation-cap-green.svg" alt="" className={styles.icon} />
                            </div>
                            <h3 className={styles.cardTitleDark}>Ученици и млади хора</h3>
                        </div>
                        <div className={`${styles.card} ${styles.cardSecondary}`}>
                            <div className={styles.iconWrapperPrimary}>
                                <img src="/megaphone.svg" alt="" className={styles.icon} />
                            </div>
                            <h3 className={styles.cardTitleLight}>Хора с мнение</h3>
                        </div>
                    </div>
                    
                    <div className={styles.cardRow}>
                        <div className={`${styles.card} ${styles.cardSecondary}`}>
                            <div className={styles.iconWrapperPrimary}>
                                <img src="/rocket-launch.svg" alt="" className={styles.icon} />
                            </div>
                            <h3 className={styles.cardTitleLight}>Хора, които искат да действат</h3>
                        </div>
                        <div className={`${styles.card} ${styles.cardSecondary}`}>
                            <div className={styles.iconWrapperPrimary}>
                                <img src="/earth-europe.svg" alt="" className={styles.icon} />
                            </div>
                            <h3 className={styles.cardTitleLight}>Всеки, който иска да промени средата около себе си</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TargetAudienceSection;
