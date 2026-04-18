import styles from "./ResultsView.module.css";

export default function ResultsView({ result, loading }) {
    if (loading) {
        return <div className={styles.loading}>Анализируем...</div>;
    }

    if (!result) return null;

    return (
        <div className={styles.container}>
            <div className={styles.columns}>
                <div className={styles.block}>
                    <h3>Исходный</h3>
                    <p className={styles.red}>{result.original}</p>
                </div>

                <div className={styles.block}>
                    <h3>Исправленный</h3>
                    <p className={styles.green}>{result.fixed}</p>
                </div>
            </div>

            <div className={styles.issues}>
                <h4>Проблемы:</h4>
                <ul>
                    {result.issues.map((i, idx) => (
                        <li key={idx}>⚠️ {i}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}