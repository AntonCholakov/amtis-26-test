import { useState } from 'react';
import styles from './ParticipateForm.module.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (values) => {
    const errors = {};

    if (!values.fullName.trim()) {
        errors.fullName = 'Моля, въведи твоето име.';
    }
    if (!values.email.trim()) {
        errors.email = 'Моля, въведи имейл адрес.';
    } else if (!emailPattern.test(values.email.trim())) {
        errors.email = 'Моля, въведи валиден имейл.';
    }
    if (!values.phone.trim()) {
        errors.phone = 'Моля, въведи телефонен номер.';
    }

    return errors;
};

function ParticipateForm({
    isSubmitting = false,
    submitError = null,
    onSubmit,
    onCancel,
}) {
    const [values, setValues] = useState({
        fullName: '',
        email: '',
        phone: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(values);
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.leftColumn}>
                <div className={styles.imageWrapper}>
                    <picture>
                        <source srcSet="/enroll-img.png" />
                        <img src="/enroll-img.png" alt="Participate" className={styles.panelImage} />
                    </picture>
                </div>
                
                <div className={styles.leftTextContent}>
                    <h2 className={styles.leftTitle}>Включи се и ти!</h2>
                    <p className={styles.leftDescription}>
                        Стани част от ГЛАС МОГА ТУК И СЕГА и вземи активно участие в тази активност.
                    </p>
                </div>
            </div>

            <div className={styles.rightColumn}>
                <form className={styles.inputGroupsContainer} onSubmit={handleSubmit} noValidate>
                    <div className={styles.inputGroup}>
                        <div className={styles.labelWrapper}>
                            <label htmlFor="fullName" className={styles.label}>Твоето име</label>
                            <span className={styles.requiredStar}>*</span>
                        </div>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={values.fullName}
                            onChange={handleChange}
                            className={`${styles.inputField} ${errors.fullName ? styles.inputError : ''}`}
                            placeholder="Иван Иванов"
                        />
                        {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.labelWrapper}>
                            <label htmlFor="email" className={styles.label}>Имейл адрес</label>
                            <span className={styles.requiredStar}>*</span>
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className={`${styles.inputField} ${errors.email ? styles.inputError : ''}`}
                            placeholder="example@mail.com"
                        />
                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.labelWrapper}>
                            <label htmlFor="phone" className={styles.label}>Телефонен номер</label>
                            <span className={styles.requiredStar}>*</span>
                        </div>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            className={`${styles.inputField} ${errors.phone ? styles.inputError : ''}`}
                            placeholder="Напр.: 08ХХ ХХХ ХХХ"
                        />
                        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                    </div>

                    {submitError && (
                        <div className={styles.errorText} style={{ textAlign: 'center' }}>
                            {submitError}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className={styles.btnSubmit}
                        disabled={isSubmitting}
                    >
                        <span className={styles.btnText}>
                            {isSubmitting ? 'Изпращане...' : 'Включи се'}
                        </span>
                        {!isSubmitting && (
                            <div className={styles.arrowCircle}>
                                <img src="/arrow.svg" alt="" className={styles.arrowIcon} />
                            </div>
                        )}
                    </button>
                    
                    <button 
                        type="button" 
                        className={styles.btnClose} 
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        затвори
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ParticipateForm;
