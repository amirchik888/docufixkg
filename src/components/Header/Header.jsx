import styles from "./Header.module.css";
import { useState, useRef, useEffect } from "react";
export default function Header() {
    const [showAbout, setShowAbout] = useState(false);
    const popupRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowAbout(false);
            }
        };

        if (showAbout) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showAbout]);
    return (
        <header className={styles.header}>

            {/* ЛОГОТИП */}
            <div className={styles.logoWrapper}>
                <img
                    src="/public/image_9dfa7b19.png" alt="logo"
                    className={styles.logo}
                />
            </div>

            <nav className={styles.nav}>
                <button onClick={() => setShowAbout(!showAbout)}>
                    О проекте
                </button>
                <button>Контакты</button>
            </nav>

            <div className={styles.langSwitch}>
                <button className={`${styles.langBtn} ${styles.active}`}>RU</button>
                <button className={styles.langBtn}>KG</button>
            </div>
            {/* ДЕКОР */}
            <div className={styles.headerGlow}></div>
            {showAbout && (
                <div className={styles.aboutPopup}>
                    <div className={styles.aboutCard} ref={popupRef}>
                        <div className={styles.icon}></div>

                        <h3>DokuFix KG</h3>

                        <p>
                            AI-сервис для обнаружения ошибок, улучшения структуры и повышения
                            качества документов на кыргызском и русском языках.
                        </p>

                        <button
                            className={styles.close}
                            onClick={() => setShowAbout(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

        </header>
    );
}