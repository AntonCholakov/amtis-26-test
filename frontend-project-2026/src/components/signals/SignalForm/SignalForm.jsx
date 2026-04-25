import { useEffect, useState } from 'react';
import styles from './SignalForm.module.css';

const featureBullets = [
    'Посочи точното място',
    'Прикачи актуална снимка',
    'Следи статуса в реално време',
];

const emptyValues = {
    title: '',
    categoryId: '',
    location: '',
    description: '',
    reporterName: '',
    reporterEmail: '',
};

const variantPresets = {
    create: {
        title: 'Подай сигнал',
        description: 'Видял си нещо, което се нуждае от внимание? Изпрати ни информация и ние ще задвижим нещата.',
        submitLabel: 'Изпрати сигнала',
        showBullets: true,
    },
    edit: {
        title: 'Редактирай сигнал',
        description: 'Редактирайте изпратения сигнал, след което натиснете бутона ЗАПАЗИ.',
        submitLabel: 'Запази',
        showBullets: false,
    },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (values) => {
    const errors = {};

    if (!values.title.trim()) {
        errors.title = 'Моля, въведи заглавие.';
    }
    if (!values.categoryId) {
        errors.categoryId = 'Моля, избери категория.';
    }
    if (!values.location.trim()) {
        errors.location = 'Моля, посочи локация.';
    }
    if (!values.description.trim()) {
        errors.description = 'Моля, опиши проблема.';
    }
    if (!values.reporterName.trim()) {
        errors.reporterName = 'Моля, въведи името си.';
    }
    if (!values.reporterEmail.trim()) {
        errors.reporterEmail = 'Моля, въведи имейл адрес.';
    } else if (!emailPattern.test(values.reporterEmail.trim())) {
        errors.reporterEmail = 'Моля, въведи валиден имейл.';
    }

    return errors;
};

const buildInitialValues = (signal, categories) => {
    if (!signal) {
        return emptyValues;
    }

    const matchedCategory = categories.find((category) => category.label === signal.category);

    return {
        title: signal.title ?? '',
        categoryId: matchedCategory ? String(matchedCategory.id) : '',
        location: signal.location ?? '',
        description: signal.description ?? '',
        reporterName: signal.reporterName ?? '',
        reporterEmail: signal.reporterEmail ?? '',
    };
};

function SignalForm({
    variant = 'create',
    signal = null,
    categories = [],
    isSubmitting = false,
    submitError = null,
    onSubmit,
    onCancel,
}) {
    const preset = variantPresets[variant] ?? variantPresets.create;

    const [values, setValues] = useState(() => buildInitialValues(signal, categories));
    const [initialValues, setInitialValues] = useState(() => buildInitialValues(signal, categories));
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const next = buildInitialValues(signal, categories);
        setValues(next);
        setInitialValues(next);
        setErrors({});
    }, [signal, categories]);

    const isDirty = Object.keys(values).some(
        (field) => values[field] !== initialValues[field],
    );
    const isSubmitDisabled = isSubmitting || (variant === 'edit' && !isDirty);

    const handleChange = (field) => (event) => {
        setValues((current) => ({ ...current, [field]: event.target.value }));
        if (errors[field]) {
            setErrors((current) => {
                const next = { ...current };
                delete next[field];
                return next;
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = validate(values);
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        onSubmit({
            title: values.title.trim(),
            categoryId: Number(values.categoryId),
            location: values.location.trim(),
            description: values.description.trim(),
            reporterName: values.reporterName.trim(),
            reporterEmail: values.reporterEmail.trim(),
        });
    };

    return (
        <form className={styles.card} onSubmit={handleSubmit} noValidate>
            <aside className={styles.intro}>
                <div className={styles.imageWrapper}>
                    <picture>
                        <source srcSet="/unsplash_x2j6lj09DhM.jpg" />
                        <img src="/unsplash_x2j6lj09DhM.jpg" alt="" className={styles.image} />
                    </picture>
                </div>

                <div className={styles.introText}>
                    <h3 className={styles.introTitle}>{preset.title}</h3>
                    <p className={styles.introDescription}>{preset.description}</p>
                </div>

                {preset.showBullets && (
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
                )}
            </aside>

            <div className={styles.fields}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="signal-title">
                        Заглавие на сигнала <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <input
                        id="signal-title"
                        type="text"
                        className={styles.input}
                        placeholder="Напр. Счупена пейка в парка"
                        value={values.title}
                        onChange={handleChange('title')}
                        disabled={isSubmitting}
                        aria-invalid={Boolean(errors.title)}
                        aria-describedby={errors.title ? 'signal-title-error' : undefined}
                        required
                    />
                    {errors.title && (
                        <p id="signal-title-error" className={styles.errorMessage}>{errors.title}</p>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="signal-category">
                        Категория <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <div className={styles.selectWrapper}>
                        <select
                            id="signal-category"
                            className={`${styles.input} ${styles.select}`}
                            value={values.categoryId}
                            onChange={handleChange('categoryId')}
                            disabled={isSubmitting}
                            aria-invalid={Boolean(errors.categoryId)}
                            aria-describedby={errors.categoryId ? 'signal-category-error' : undefined}
                            required
                        >
                            <option value="" disabled>Избери категория</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                        <span className={styles.chevron} aria-hidden="true">
                            <svg viewBox="0 0 12 12" fill="none">
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                    {errors.categoryId && (
                        <p id="signal-category-error" className={styles.errorMessage}>{errors.categoryId}</p>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="signal-location">
                        Локация <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <input
                        id="signal-location"
                        type="text"
                        className={styles.input}
                        placeholder="Улица, квартал ..."
                        value={values.location}
                        onChange={handleChange('location')}
                        disabled={isSubmitting}
                        aria-invalid={Boolean(errors.location)}
                        aria-describedby={errors.location ? 'signal-location-error' : undefined}
                        required
                    />
                    {errors.location && (
                        <p id="signal-location-error" className={styles.errorMessage}>{errors.location}</p>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="signal-description">
                        Описание <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <textarea
                        id="signal-description"
                        className={`${styles.input} ${styles.textarea}`}
                        placeholder="Опиши проблема подробно..."
                        rows={4}
                        value={values.description}
                        onChange={handleChange('description')}
                        disabled={isSubmitting}
                        aria-invalid={Boolean(errors.description)}
                        aria-describedby={errors.description ? 'signal-description-error' : undefined}
                        required
                    />
                    {errors.description && (
                        <p id="signal-description-error" className={styles.errorMessage}>{errors.description}</p>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="signal-reporter-name">
                        Твоето име <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <input
                        id="signal-reporter-name"
                        type="text"
                        className={styles.input}
                        placeholder="Иван Иванов"
                        value={values.reporterName}
                        onChange={handleChange('reporterName')}
                        disabled={isSubmitting}
                        aria-invalid={Boolean(errors.reporterName)}
                        aria-describedby={errors.reporterName ? 'signal-reporter-name-error' : undefined}
                        required
                    />
                    {errors.reporterName && (
                        <p id="signal-reporter-name-error" className={styles.errorMessage}>{errors.reporterName}</p>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="signal-reporter-email">
                        Имейл адрес <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <input
                        id="signal-reporter-email"
                        type="email"
                        className={styles.input}
                        placeholder="example@mail.com"
                        value={values.reporterEmail}
                        onChange={handleChange('reporterEmail')}
                        disabled={isSubmitting}
                        aria-invalid={Boolean(errors.reporterEmail)}
                        aria-describedby={errors.reporterEmail ? 'signal-reporter-email-error' : undefined}
                        required
                    />
                    {errors.reporterEmail && (
                        <p id="signal-reporter-email-error" className={styles.errorMessage}>{errors.reporterEmail}</p>
                    )}
                </div>

                {submitError && (
                    <p className={styles.submitError} role="alert">{submitError}</p>
                )}

                <button type="submit" className={styles.submitButton} disabled={isSubmitDisabled}>
                    <span className={styles.submitLabel}>
                        {isSubmitting ? 'Изпращане...' : preset.submitLabel}
                    </span>
                    <span className={styles.submitArrow} aria-hidden="true">
                        <picture>
                            <source srcSet="/arrow.svg" />
                            <img src="/arrow.svg" alt="" />
                        </picture>
                    </span>
                </button>

                <button type="button" className={styles.closeButton} onClick={onCancel} disabled={isSubmitting}>
                    затвори
                </button>
            </div>
        </form>
    );
}

export default SignalForm;
