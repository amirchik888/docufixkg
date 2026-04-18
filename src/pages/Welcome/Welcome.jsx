import styles from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";
import BackgroundPattern from "../../components/BackgroundPattern/BackgroundPattern";
import { useState } from "react";


export default function Welcome( ) {
    const [lang, setLang] = useState("RU");
    const navigate = useNavigate();
    const userName = "Амир"; // потом заменишь на реальные данные
    const t = {
        RU: {
            greeting: "Здравствуйте",
            welcome: "Добро пожаловать",
            start: "Начать работу"
        },
        KG: {
            greeting: "Салам",
            welcome: "Кош келиңиз",
            start: "Баштоо"
        }
    };

    return (
        <div className={styles.page}>
            <BackgroundPattern />

            {/* TOP RIGHT */}
            <div className={styles.topRight}>
                <button className={styles.settings}>⚙</button>
                <div className={styles.langSwitch}>
                        <button
                            className={`${styles.langBtn} ${lang === "RU" ? styles.active : ""}`}
                            onClick={() => setLang("RU")}
                        >
                            RU
                        </button>

                        <button
                            className={`${styles.langBtn} ${lang === "KG" ? styles.active : ""}`}
                            onClick={() => setLang("KG")}
                        >
                            KG
                        </button>
                </div>



            </div>

            {/* MAIN */}
            <div className={styles.content}>
                <h1>
                    {t[lang].greeting}, {userName}! <br />
                    {t[lang].welcome} в <span>DocuFix KG</span>
                </h1>

                <p>AI поможет улучшить ваши документы за считанные секунды</p>
                <button
                    className={styles.cta}
                    onClick={() => navigate("/Category")}
                >
                    {t[lang].start}
                </button>

            </div>




            <div className={styles.glow}></div>

        </div>

    );
}