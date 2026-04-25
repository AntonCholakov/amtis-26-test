import { Link } from 'react-router-dom';
import styles from './SignalsHeader.module.css';

function SignalsHeader() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                <Link to="/" className={styles.logo} aria-label="ГЛАС МОГА — начало">
                    <span className={styles.logoBadge}>ГЛАС</span>
                    <span className={styles.logoText}>МОГА</span>
                </Link>
            </div>
        </header>
    );
}

export default SignalsHeader;
