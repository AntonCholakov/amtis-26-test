import { Link } from 'react-router-dom';
import styles from './ActivityHeader.module.css';

function ActivityHeader() {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo} aria-label="ГЛАС МОГА - начало">
                <span className={styles.logoBadge}>ГЛАС</span>
                <span className={styles.logoText}>МОГА</span>
            </Link>
        </header>
    );
}

export default ActivityHeader;
