import styles from './SuccessView.module.css';

function SuccessView({ title, message, onClose }) {
    return (
        <div className={styles.container}>
            <div className={styles.textContent}>
                <p className={styles.message}>{message}</p>
                <h2 className={styles.title}>{title}</h2>
            </div>
            
            <button className={styles.btnAction} onClick={onClose}>
                Чудесно!
            </button>
        </div>
    );
}

export default SuccessView;
