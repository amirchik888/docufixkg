import styles from "./AIHighlights.module.css";

export default function AIHighlights() {
    return (
        <div className={styles.wrapper}>
            <h1>Улучшай документы за 60 секунд</h1>
            <p>AI-проверка на кыргызском и русском языках</p>

            <div className={styles.features}>
                <div> Проверка структуры</div>
                <div> Исправление ошибок</div>
                <div> AI анализ</div>
            </div>
        </div>
    );
}