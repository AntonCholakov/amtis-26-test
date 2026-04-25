import styles from './HowItWorksSection.module.css';

const steps = [
    {
        number: '01',
        title: 'Създай профил',
        description: 'Регистрирай се бързо и лесно, за да започнеш своето участие в общността.',
    },
    {
        number: '02',
        title: 'Избери тема',
        description: 'Намери каузата или темата, която те вълнува — от екология до образование.',
    },
    {
        number: '03',
        title: 'Включи се в дискусия',
        description: 'Изрази мнение, гласувай и се свържи с хора, мислещи като теб.',
    },
    {
        number: '04',
        title: 'Направи реално действие',
        description: 'От думи към дела — стани двигател на промяна в твоята общност.',
    },
];

function HowItWorksSection() {
    return (
        <section id="how-it-works" className={`container ${styles.section}`}>
            <div className={styles.panel}>
                <div className={styles.headerGroup}>
                    <p className={`section-tagline ${styles.taglineColor}`}>Процесът</p>
                    <h2 className={`section-title ${styles.titleColor}`}>Как работи?</h2>
                </div>

                <ol className={styles.stepList}>
                    {steps.map(({ number, title, description }) => (
                        <li key={number} className={styles.step}>
                            <span aria-hidden="true" className={styles.stepNumber}>{number}</span>
                            <h3 className={styles.stepTitle}>{title}</h3>
                            <p className={styles.stepDescription}>{description}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export default HowItWorksSection;
