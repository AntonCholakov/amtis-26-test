import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignalsHeader from '../../components/layout/SignalsHeader/SignalsHeader';
import Footer from '../../components/layout/Footer/Footer';
import SignalCard from '../../components/signals/SignalCard/SignalCard';
import SignalForm from '../../components/signals/SignalForm/SignalForm';
import SignalFeedbackCard from '../../components/signals/SignalFeedbackCard/SignalFeedbackCard';
import DeleteSignalConfirm from '../../components/signals/DeleteSignalConfirm/DeleteSignalConfirm';
import Modal from '../../ui/Modal/Modal';
import { createSignal, deleteSignal, updateSignal } from '../../api/signalsApi';
import { useSignals } from '../../hooks/useSignals';
import { useSignalCategories } from '../../hooks/useSignalCategories';
import { useToast } from '../../hooks/useToast';
import styles from './SignalsPage.module.css';

const RESOLVED_STATUS = 'Решен';

const featureBullets = [
    'Посочи точното място',
    'Прикачи актуална снимка',
    'Следи статуса в реално време',
];

const dateFormatter = new Intl.DateTimeFormat('bg-BG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});

const MODAL = {
    closed: 'closed',
    create: 'create',
    edit: 'edit',
    delete: 'delete',
    createSuccess: 'create-success',
    editSuccess: 'edit-success',
    editError: 'edit-error',
};

function SignalsPage() {
    const { signals, isLoading, error, refetch } = useSignals();
    const { categories } = useSignalCategories();
    const toast = useToast();

    const [modalType, setModalType] = useState(MODAL.closed);
    const [activeSignal, setActiveSignal] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState('idle');
    const [submitError, setSubmitError] = useState(null);

    const activeCount = signals.filter((signal) => signal.status !== RESOLVED_STATUS).length;
    const sortedSignals = [...signals].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    const lastUpdatedDate = dateFormatter.format(new Date());

    const closeModal = () => {
        setModalType(MODAL.closed);
        setActiveSignal(null);
        setSubmissionStatus('idle');
        setSubmitError(null);
    };

    const openCreate = () => {
        setActiveSignal(null);
        setSubmitError(null);
        setSubmissionStatus('idle');
        setModalType(MODAL.create);
    };

    const openEdit = (signal) => {
        setActiveSignal(signal);
        setSubmitError(null);
        setSubmissionStatus('idle');
        setModalType(MODAL.edit);
    };

    const openDelete = (signal) => {
        setActiveSignal(signal);
        setSubmitError(null);
        setSubmissionStatus('idle');
        setModalType(MODAL.delete);
    };

    const handleCreate = async (payload) => {
        setSubmissionStatus('submitting');
        setSubmitError(null);
        try {
            await createSignal(payload);
            await refetch();
            setSubmissionStatus('idle');
            setModalType(MODAL.createSuccess);
            toast.success('Сигналът е създаден успешно.');
        } catch (err) {
            const message = err.response?.data?.message ?? 'Грешка при създаване на сигнал.';
            setSubmitError(message);
            setSubmissionStatus('idle');
            toast.error(message);
        }
    };

    const handleEdit = async (payload) => {
        if (!activeSignal) {
            return;
        }
        setSubmissionStatus('submitting');
        setSubmitError(null);
        try {
            await updateSignal(activeSignal.id, payload);
            await refetch();
            setSubmissionStatus('idle');
            setActiveSignal(null);
            setModalType(MODAL.editSuccess);
            toast.success('Промените са запазени.');
        } catch (err) {
            const message = err.response?.data?.message ?? 'Грешка при редактиране на сигнал.';
            setSubmitError(message);
            setSubmissionStatus('idle');
            setModalType(MODAL.editError);
            toast.error(message);
        }
    };

    const handleDelete = async () => {
        if (!activeSignal) {
            return;
        }
        setSubmissionStatus('submitting');
        try {
            await deleteSignal(activeSignal.id);
            await refetch();
            closeModal();
            toast.success('Сигналът е изтрит.');
        } catch (err) {
            const message = err.response?.data?.message ?? 'Грешка при изтриване на сигнал.';
            setSubmitError(message);
            setSubmissionStatus('idle');
            toast.error(message);
        }
    };

    return (
        <div className={styles.page}>
            <SignalsHeader />

            <main className={`container ${styles.main}`}>
                <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
                    <Link to="/" className={styles.breadcrumbLink}>Начало</Link>
                    <span aria-hidden="true" className={styles.breadcrumbSeparator}>›</span>
                    <span aria-current="page" className={styles.breadcrumbCurrent}>Активни сигнали</span>
                </nav>

                <div className={styles.layout}>
                    <aside className={styles.intro}>
                        <div className={styles.titleRow}>
                            <h1 className={styles.title}>Активни сигнали</h1>
                            <span className={styles.countBadge}>{activeCount}</span>
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

                        <button type="button" className={styles.cta} onClick={openCreate}>
                            <span className={styles.ctaLabel}>Подай сигнал</span>
                            <span className={styles.ctaArrow}>
                                <picture>
                                    <source srcSet="/arrow.svg" />
                                    <img src="/arrow.svg" alt="" />
                                </picture>
                            </span>
                        </button>
                    </aside>

                    <section className={styles.list} aria-labelledby="signals-list-heading">
                        <h2 id="signals-list-heading" className={styles.visuallyHidden}>
                            Списък със сигнали
                        </h2>

                        <p className={styles.lastUpdated}>
                            <span className={styles.lastUpdatedLabel}>Последно обновено:</span>
                            <span className={styles.lastUpdatedDate}>{lastUpdatedDate}</span>
                        </p>

                        {isLoading && (
                            <p className={styles.stateMessage}>Зареждане на сигнали…</p>
                        )}

                        {error && !isLoading && (
                            <p className={styles.stateMessage}>
                                Грешка при зареждане. Опитайте отново по-късно.
                            </p>
                        )}

                        {!isLoading && !error && signals.length === 0 && (
                            <p className={styles.stateMessage}>
                                Все още няма подадени сигнали.
                            </p>
                        )}

                        {!isLoading && !error && signals.length > 0 && (
                            <ul className={styles.cardList}>
                                {sortedSignals.map((signal) => (
                                    <li key={signal.id}>
                                        <SignalCard
                                            signal={signal}
                                            onEdit={openEdit}
                                            onDelete={openDelete}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </main>

            <Footer />

            <Modal
                isOpen={modalType !== MODAL.closed}
                onClose={closeModal}
                ariaLabel={modalType === MODAL.delete ? 'Потвърди изтриването' : 'Сигнал'}
            >
                {modalType === MODAL.create && (
                    <SignalForm
                        variant="create"
                        categories={categories}
                        isSubmitting={submissionStatus === 'submitting'}
                        submitError={submitError}
                        onSubmit={handleCreate}
                        onCancel={closeModal}
                    />
                )}

                {modalType === MODAL.edit && (
                    <SignalForm
                        variant="edit"
                        signal={activeSignal}
                        categories={categories}
                        isSubmitting={submissionStatus === 'submitting'}
                        submitError={submitError}
                        onSubmit={handleEdit}
                        onCancel={closeModal}
                    />
                )}

                {modalType === MODAL.delete && (
                    <DeleteSignalConfirm
                        isSubmitting={submissionStatus === 'submitting'}
                        onConfirm={handleDelete}
                        onCancel={closeModal}
                    />
                )}

                {modalType === MODAL.createSuccess && (
                    <SignalFeedbackCard variant="create-success" onClose={closeModal} />
                )}

                {modalType === MODAL.editSuccess && (
                    <SignalFeedbackCard variant="edit-success" onClose={closeModal} />
                )}

                {modalType === MODAL.editError && (
                    <SignalFeedbackCard variant="edit-error" onClose={closeModal} />
                )}
            </Modal>
        </div>
    );
}

export default SignalsPage;
