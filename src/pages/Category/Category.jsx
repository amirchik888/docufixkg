import styles from "./Category.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BackgroundPattern from "../../components/BackgroundPattern/BackgroundPattern";
export default function Category() {
    const [lang, setLang] = useState("RU");
    const navigate = useNavigate();



    const t = {
        RU: {
            title: "Выберите, что хотите улучшить",
            subtitle: "Учёба и работа в одном месте",
            back: "← Назад",
            profile: "Личный кабинет",
            study: "Учёба",
            work: "Работа"
        },
        KG: {
            title: "Эмнени жакшырткыңыз келет тандаңыз",
            subtitle: "Окуу жана жумуш бир жерде",
            back: "← Артка",
            profile: "Жеке кабинет",
            study: "Окуу",
            work: "Жумуш"
        }
    };

    const categories = [
        {
            title: "Учёба",
            type: "study",
            icon: "",
            items: [
                { name: "Рефераты", path: "/process/study/essay" },
                { name: "Домашние задания", path: "/process/study/homework" }
            ]
        },
        {
            title: "Работа",
            type: "work",
            icon: "",
            items: [
                { name: "Резюме", path: "/process/work/resume" },
                { name: "Заявления", path: "/process/work/application" },
                { name: "Договоры", path: "/process/work/contract" }
            ]
        }
    ];

    return (
        <div className={styles.page}>
            <BackgroundPattern />

            {/* TOP */}
            <div className={styles.top}>
                <button
                    className={styles.back}
                    onClick={() => navigate(-1)}
                >
                    {t[lang].back}
                </button>

                <div className={styles.right}>
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

                    <button className={styles.profile}>{t[lang].profile}</button>
                </div>
            </div>

            {/* HEADER */}
            <div className={styles.header}>
                <h1>{t[lang].title}</h1>
                <p>{t[lang].subtitle}</p>
            </div>

            {/* CARDS */}
            <div className={styles.grid}>
                {categories.map((cat) => (
                    <div key={cat.key} className={`${styles.card} ${styles.greenCard}`}>

                        <div className={styles.icon}>{cat.icon}</div>

                        <h2>
                            {t[lang][cat.key]}
                        </h2>

                        <ul>
                            {cat.items.map((item) => (
                                <li
                                    key={item.name}
                                    className={styles.item}
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>

                    </div>
                ))}
            </div>

            <div className={styles.glow}></div>
        </div>
    );
}