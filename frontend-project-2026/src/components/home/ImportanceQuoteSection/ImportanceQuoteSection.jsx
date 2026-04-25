import styles from './ImportanceQuoteSection.module.css';

function ImportanceQuoteSection() {
    return (
        <section className={`container ${styles.section}`}>
            <div className={styles.introCard}>
                <div className={styles.introCardImage}>
                    <img src="/quotes-two.svg" alt="Кавички" />
                </div>
                <div className={styles.headingWrapper}>
                    <p className={styles.tagline}>
                        Вярваме, че
                    </p>
                    <p className={styles.quoteText}>
                        "Промяната започва от хората, които не остават безразлични."
                    </p>
                    <p className={styles.subtext}>
                        Когато се включиш, ти не просто изразяваш мнение — ти създаваш възможност за реална промяна.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ImportanceQuoteSection;
