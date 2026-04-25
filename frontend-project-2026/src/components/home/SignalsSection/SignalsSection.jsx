import { Link } from 'react-router-dom';
import SignalCard from '../../signals/SignalCard/SignalCard';
import styles from './SignalsSection.module.css';

const RESOLVED_STATUS = 'Решен';
const PREVIEW_LIMIT = 3;

const featureBullets = [
    'Посочи точното място',
    'Прикачи актуална снимка',
    'Следи статуса в реално време',
];

function SignalsSection({
    signals = [],
    isLoading = false,
    error = null,
    onOpenSignalModal,
    onEditSignal,
    onDeleteSignal,
}) {
    const activeCount = signals.filter((signal) => signal.status !== RESOLVED_STATUS).length;
    const previewSignals = [...signals]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, PREVIEW_LIMIT);

    const showLoading = isLoading;
    const showError = !isLoading && Boolean(error);
    const showEmpty = !isLoading && !error && signals.length === 0;
    const showSignals = !isLoading && !error && signals.length > 0;

    return (
        <section id="report" className={`container ${styles.section}`}>
            <div className={styles.layout}>
                <aside className={styles.intro}>
                    <div className={styles.titleRow}>
                        <h2 className={`section-title ${styles.title}`}>Активни сигнали</h2>
                        {!isLoading && !error && (
                            <span className={styles.countBadge}>{activeCount}</span>
                        )}
                    </div>

                    <p className={styles.description}>
                        Видял си нещо, което се нуждае от внимание? Изпрати ни информация и ние ще задвижим нещата.
                    </p>

                    <ul className={styles.bulletList}>
                        {featureBullets.map((bullet) => (
                            <li key={bullet} className={styles.bullet}>
                                <span className={styles.bulletIcon}>
                                    <picture>
                                        <source srcSet="/megaphone.svg" />
                                        <img src="/megaphone.svg" alt="" className={styles.bulletIconImage} />
                                    </picture>
                                </span>
                                <span className={styles.bulletLabel}>{bullet}</span>
                            </li>
                        ))}
                    </ul>

                    <button type="button" className={styles.cta} onClick={onOpenSignalModal}>
                        <span className={styles.ctaLabel}>Подай сигнал</span>
                        <span className={styles.ctaArrow}>
                            <picture>
                                <source srcSet="/arrow.svg" />
                                <img src="/arrow.svg" alt="" />
                            </picture>
                        </span>
                    </button>
                </aside>

                <div className={styles.signalsList}>
                    {showLoading && (
                        <p className={styles.stateMessage}>Зареждане на сигнали…</p>
                    )}

                    {showError && (
                        <p className={styles.stateMessage}>
                            Грешка при зареждане. Опитайте отново по-късно.
                        </p>
                    )}

                    {showEmpty && (
                        <p className={styles.stateMessage}>Все още няма подадени сигнали.</p>
                    )}

                    {showSignals && (
                        <ul className={styles.cardList}>
                            {previewSignals.map((signal) => (
                                <li key={signal.id}>
                                    <SignalCard
                                        signal={signal}
                                        onEdit={onEditSignal}
                                        onDelete={onDeleteSignal}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}

                    <Link to="/signals" className={styles.viewAllButton}>
                        Всички сигнали
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default SignalsSection;
