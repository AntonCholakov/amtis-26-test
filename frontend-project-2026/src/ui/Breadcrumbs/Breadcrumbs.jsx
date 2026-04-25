import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

function Breadcrumbs({ activityTitle }) {
    return (
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link to="/" className={styles.crumb}>Начало</Link>
            <span className={styles.separator}>›</span>
            <Link to="/home#activities" className={styles.crumb}>Активности</Link>
            <span className={styles.separator}>›</span>
            <span className={styles.current}>{activityTitle}</span>
        </nav>
    );
}

export default Breadcrumbs;
