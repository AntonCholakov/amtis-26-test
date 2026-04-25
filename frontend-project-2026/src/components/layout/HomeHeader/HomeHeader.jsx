import { useState } from 'react';
import { Link } from 'react-router-dom';
import useActiveSection from '../../../hooks/useActiveSection';
import styles from './HomeHeader.module.css';

const navItems = [
    { label: 'За ГЛАС МОГА', href: '#about' },
    { label: 'Как работи?', href: '#how-it-works' },
    { label: 'Възможности', href: '#opportunities' },
    { label: 'Активности', href: '#activities' },
    { label: 'Подай сигнал', href: '#report' },
    { label: 'Истории', href: '#stories' },
    { label: 'За кого е?', href: '#audience' },
    { label: 'Контакти', href: '#contacts' },
];

const sectionIds = navItems.map((item) => item.href.slice(1));

function HomeHeader({ onOpenSignalModal }) {
    const activeId = useActiveSection(sectionIds);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const toggleMobileNav = () => {
        setIsMobileNavOpen((current) => !current);
    };

    const closeMobileNav = () => {
        setIsMobileNavOpen(false);
    };

    const navClassName = isMobileNavOpen
        ? `${styles.nav} ${styles.navOpen}`
        : styles.nav;

    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.leftSection}>
                    <Link to="/" className={styles.logo} aria-label="ГЛАС МОГА - начало">
                        <span className={styles.logoBadge}>ГЛАС</span>
                        <span className={styles.logoText}>МОГА</span>
                    </Link>

                    <nav id="primary-nav" className={navClassName} aria-label="Основна навигация">
                        <ul className={styles.navList}>
                            {navItems.map((item) => {
                                const isActive = activeId === item.href.slice(1);
                                const linkClassName = isActive
                                    ? `${styles.navLink} ${styles.navLinkActive}`
                                    : styles.navLink;

                                return (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className={linkClassName}
                                            aria-current={isActive ? 'location' : undefined}
                                            onClick={closeMobileNav}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.profileButton}
                        aria-label="Профил"
                    >
                        <img
                            src="/user.svg"
                            alt=""
                            className={styles.profileIcon}
                        />
                    </button>

                    <button type="button" className={styles.ctaButton} onClick={onOpenSignalModal}>
                        <span>Подай сигнал</span>
                        <span className={styles.ctaIcon} aria-hidden="true">
                            <img src="/arrow.svg" alt="" />
                        </span>
                    </button>

                    <button
                        type="button"
                        className={styles.hamburger}
                        aria-label="Меню"
                        aria-expanded={isMobileNavOpen}
                        aria-controls="primary-nav"
                        onClick={toggleMobileNav}
                    >
                        <img src="/hamburger.svg" alt="" className={styles.hamburgerIcon} />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default HomeHeader;
