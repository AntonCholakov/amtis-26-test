import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const navLinks = [
    { label: 'За ГЛАС МОГА', href: '#about' },
    { label: 'Как работи?', href: '#how-it-works' },
    { label: 'Възможности', href: '#opportunities' },
    { label: 'Активности', href: '#activities' },
    { label: 'Подай сигнал', href: '#report' },
    { label: 'История', href: '#history' },
    { label: 'За кого е?', href: '#audience' },
    { label: 'Включи се', href: '#join' },
];

const socialLinks = [
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'LinkedIn', href: '#' },
];

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.leftCol}>
                    <Link to="/" className={styles.logo} aria-label="ГЛАС МОГА - начало">
                        <span className={styles.logoBadge}>ГЛАС</span>
                        <span className={styles.logoText}>МОГА</span>
                    </Link>
                    <p className={styles.slogan}>Гласът ти има значение.</p>
                </div>
                
                <div className={styles.midCol}>
                    <ul className={styles.navRow}>
                        {navLinks.map((item) => (
                            <li key={item.label}>
                                <a href={item.href} className={styles.navLink}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.socialRow}>
                        {socialLinks.map((item) => (
                            <li key={item.label}>
                                <a href={item.href} className={styles.socialLink}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className={styles.rightCol}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} ГЛАС МОГА ТУК И СЕГА. Всички<br />права запазени.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
