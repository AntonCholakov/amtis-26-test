import { useState } from 'react';
import { subscribe } from '../../../api/newsletterApi';
import { useToast } from '../../../hooks/useToast';
import styles from './NewsletterSection.module.css';

const initialValues = { name: '', email: '', message: '' };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const tags = [
    { icon: '/graduation-cap-black.svg', label: 'За студенти' },
    { icon: '/megaphone.svg', label: 'С мнение' },
    { icon: '/rocket-launch.svg', label: 'Активни' },
];

const validate = (values) => {
    const errors = {};

    if (!values.name.trim()) {
        errors.name = 'Моля, въведи името си.';
    }

    if (!values.email.trim()) {
        errors.email = 'Моля, въведи имейл адрес.';
    } else if (!emailPattern.test(values.email.trim())) {
        errors.email = 'Моля, въведи валиден имейл адрес.';
    }

    if (!values.message.trim()) {
        errors.message = 'Моля, въведи съобщение.';
    }

    return errors;
};

function NewsletterSection() {
    const toast = useToast();
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('idle');
    const [submitError, setSubmitError] = useState(null);

    const isSubmitting = submissionStatus === 'submitting';
    const isSuccess = submissionStatus === 'success';

    const handleChange = (field) => (event) => {
        const { value } = event.target;
        setValues((current) => ({ ...current, [field]: value }));
        if (errors[field]) {
            setErrors((current) => {
                const next = { ...current };
                delete next[field];
                return next;
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nextErrors = validate(values);
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            toast.warning('Моля, попълни всички полета коректно.');
            return;
        }

        setSubmissionStatus('submitting');
        setSubmitError(null);
        try {
            await subscribe({
                name: values.name.trim(),
                email: values.email.trim(),
                message: values.message.trim(),
            });
            setSubmissionStatus('success');
            toast.success('Формата е изпратена успешно.');
        } catch (err) {
            const message = err.response?.data?.message ?? 'Грешка при изпращане. Опитай отново.';
            setSubmitError(message);
            setSubmissionStatus('idle');
            toast.error(message);
        }
    };

    return (
        <section id="contacts" className={`container ${styles.section}`}>
            <div className={styles.container}>
                <div className={styles.leftContent}>
                    <div className={styles.textContent}>
                        <h2 className={styles.title}>Стани част от промяната.</h2>
                        <p className={styles.description}>
                            Абонирай се за нашия бюлетин, за да получаваш новини за най-важните инициативи и резултати.
                        </p>
                    </div>

                    <div className={styles.tagsRow}>
                        {tags.map(({ icon, label }) => (
                            <div key={label} className={styles.badge}>
                                <picture>
                                    <source srcSet={icon} />
                                    <img src={icon} alt="" className={styles.badgeIcon} />
                                </picture>
                                <p className={styles.badgeText}>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.formWrapper}>
                    {isSuccess ? (
                        <div className={styles.successCard} role="status" aria-live="polite">
                            <h3 className={styles.successTitle}>Благодарим ти!</h3>
                            <p className={styles.successDescription}>
                                Абонаментът ти е активиран. Очаквай новини в имейла си скоро.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.form} noValidate>
                            <div className={styles.fieldsRow}>
                                <div className={styles.inputGroup}>
                                    <div className={styles.labelWrapper}>
                                        <label className={styles.label} htmlFor="newsletter-name">Твоето име</label>
                                        <span className={styles.labelAsterisk} aria-hidden="true">*</span>
                                    </div>
                                    <input
                                        id="newsletter-name"
                                        type="text"
                                        className={styles.input}
                                        placeholder="Иван Иванов"
                                        value={values.name}
                                        onChange={handleChange('name')}
                                        disabled={isSubmitting}
                                        aria-invalid={Boolean(errors.name)}
                                        aria-describedby={errors.name ? 'newsletter-name-error' : undefined}
                                        required
                                    />
                                    {errors.name && (
                                        <p id="newsletter-name-error" className={styles.errorMessage}>{errors.name}</p>
                                    )}
                                </div>

                                <div className={styles.inputGroup}>
                                    <div className={styles.labelWrapper}>
                                        <label className={styles.label} htmlFor="newsletter-email">Имейл адрес</label>
                                        <span className={styles.labelAsterisk} aria-hidden="true">*</span>
                                    </div>
                                    <input
                                        id="newsletter-email"
                                        type="email"
                                        className={styles.input}
                                        placeholder="example@mail.com"
                                        value={values.email}
                                        onChange={handleChange('email')}
                                        disabled={isSubmitting}
                                        aria-invalid={Boolean(errors.email)}
                                        aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
                                        required
                                    />
                                    {errors.email && (
                                        <p id="newsletter-email-error" className={styles.errorMessage}>{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className={styles.inputGroupFull}>
                                <div className={styles.labelWrapper}>
                                    <label className={styles.label} htmlFor="newsletter-message">Описание</label>
                                    <span className={styles.labelAsterisk} aria-hidden="true">*</span>
                                </div>
                                <textarea
                                    id="newsletter-message"
                                    className={styles.textarea}
                                    placeholder="Твоето съобщение"
                                    value={values.message}
                                    onChange={handleChange('message')}
                                    disabled={isSubmitting}
                                    aria-invalid={Boolean(errors.message)}
                                    aria-describedby={errors.message ? 'newsletter-message-error' : undefined}
                                    required
                                />
                                {errors.message && (
                                    <p id="newsletter-message-error" className={styles.errorMessage}>{errors.message}</p>
                                )}
                            </div>

                            {submitError && (
                                <p role="alert" className={styles.submitError}>{submitError}</p>
                            )}

                            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                <span className={styles.submitText}>
                                    {isSubmitting ? 'Изпращане…' : 'Включи се сега'}
                                </span>
                                <div className={styles.btnArrowWrapper}>
                                    <picture>
                                        <source srcSet="/arrow.svg" />
                                        <img src="/arrow.svg" alt="" className={styles.btnArrow} />
                                    </picture>
                                </div>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

export default NewsletterSection;
