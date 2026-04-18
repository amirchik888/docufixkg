import styles from "./AuthCard.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCard() {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    return (
        <div className={styles.card}>
            <h2>Начать работу</h2>

            <input placeholder="Email" />
            {isRegister && (
                <input
                    placeholder="4-значный код"
                    maxLength={4}
                />
            )}
            <input placeholder="Пароль" type="password" />

            <button
                className={styles.primary}
                onClick={() => navigate("/welcome")}
            >
                Войти
            </button>

            <div className={styles.divider}>
                Нет аккаунта?
            </div>

            <button

                onClick={() => setIsRegister(true)}
               // onClick={() => navigate("/welcome")}
                className={styles.secondary}
            >
                Регистрация
            </button>

            {isRegister && (
                <button
                    className={styles.guest}
                    onClick={() => setIsRegister(false)}
                >
                    Назад ко входу
                </button>
            )}
            <button
                onClick={() => navigate("/welcome")}
                className={styles.guest}>

                Попробовать без регистрации
            </button>
        </div>
    );
}