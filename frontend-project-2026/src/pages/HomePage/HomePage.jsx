import { useState } from 'react';
import HomeHeader from '../../components/layout/HomeHeader/HomeHeader';
import Footer from '../../components/layout/Footer/Footer';
import HeroSection from '../../components/home/HeroSection/HeroSection';
import AboutSection from '../../components/home/AboutSection/AboutSection';
import HowItWorksSection from '../../components/home/HowItWorksSection/HowItWorksSection';
import ToolsSection from '../../components/home/ToolsSection/ToolsSection';
import SignalsSection from '../../components/home/SignalsSection/SignalsSection';
import ImportanceQuoteSection from '../../components/home/ImportanceQuoteSection/ImportanceQuoteSection';
import ActivitiesSection from '../../components/home/ActivitiesSection/ActivitiesSection';
import StoriesSection from '../../components/home/StoriesSection/StoriesSection';
import TargetAudienceSection from '../../components/home/TargetAudienceSection/TargetAudienceSection';
import NewsletterSection from '../../components/home/NewsletterSection/NewsletterSection';
import SignalForm from '../../components/signals/SignalForm/SignalForm';
import SignalFeedbackCard from '../../components/signals/SignalFeedbackCard/SignalFeedbackCard';
import DeleteSignalConfirm from '../../components/signals/DeleteSignalConfirm/DeleteSignalConfirm';
import Modal from '../../ui/Modal/Modal';
import { createSignal, deleteSignal, updateSignal } from '../../api/signalsApi';
import { useSignals } from '../../hooks/useSignals';
import { useSignalCategories } from '../../hooks/useSignalCategories';
import { useToast } from '../../hooks/useToast';

const MODAL = {
    closed: 'closed',
    create: 'create',
    edit: 'edit',
    delete: 'delete',
    createSuccess: 'create-success',
    editSuccess: 'edit-success',
    editError: 'edit-error',
};

function HomePage() {
    const { signals, isLoading: signalsLoading, error: signalsError, refetch } = useSignals();
    const { categories } = useSignalCategories();
    const toast = useToast();

    const [modalType, setModalType] = useState(MODAL.closed);
    const [activeSignal, setActiveSignal] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState('idle');
    const [submitError, setSubmitError] = useState(null);

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
        <>
            <HomeHeader onOpenSignalModal={openCreate} />
            <main>
                <HeroSection onOpenSignalModal={openCreate} />
                <AboutSection />
                <HowItWorksSection />
                <ToolsSection />
                <SignalsSection
                    signals={signals}
                    isLoading={signalsLoading}
                    error={signalsError}
                    onOpenSignalModal={openCreate}
                    onEditSignal={openEdit}
                    onDeleteSignal={openDelete}
                />
                <ImportanceQuoteSection />
                <ActivitiesSection />
                <StoriesSection />
                <TargetAudienceSection />
                <NewsletterSection />
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
        </>
    );
}

export default HomePage;
