import { useState } from 'react';
import styles from './DonationForm.module.css';

const AMOUNTS = [5, 10, 20, 50, 100, 200];

function DonationForm({
    isSubmitting = false,
    onSubmit,
}) {
    const [selectedAmount, setSelectedAmount] = useState(10);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ amount: selectedAmount });
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <picture>
                    <source srcSet="/donate-img.png" />
                    <img src="/donate-img.png" alt="Donate" className={styles.panelImage} />
                </picture>
            </div>

            <div className={styles.headerText}>
                <p className={styles.subtitle}>Подкрепи каузата</p>
                <h2 className={styles.title}>Направи дарение</h2>
            </div>

            <p className={styles.description}>
                Всяко дарение помага за закупуване на материали, инструменти и засаждане на нови дръвчета.
            </p>

            <div className={styles.amountGrid}>
                {AMOUNTS.map((amt) => (
                    <button
                        key={amt}
                        type="button"
                        className={`${styles.amountButton} ${selectedAmount === amt ? styles.amountButtonActive : ''}`}
                        onClick={() => setSelectedAmount(amt)}
                    >
                        {amt} €
                    </button>
                ))}
            </div>

            <button 
                type="submit" 
                className={styles.btnSubmit}
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                <span className={styles.btnText}>
                    {isSubmitting ? 'Изпращане...' : 'Дари сега'}
                </span>
                {!isSubmitting && (
                    <div className={styles.heartCircle}>
                        <img src="/heart.svg" alt="" className={styles.heartIcon} />
                    </div>
                )}
            </button>
        </div>
    );
}

export default DonationForm;
