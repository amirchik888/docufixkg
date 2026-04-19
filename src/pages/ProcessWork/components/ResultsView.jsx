import styles from "./ResultsView.module.css";

export default function ResultsView({ result, loading }) {
    if (loading) {
        return <div className={styles.loading}>Анализируем...</div>;
    }

    if (!result) return null;

    return (
        <div className={styles.container}>
            <div className={styles.columns}>

                {/* ЛЕВАЯ СТОРОНА */}
                <div className={styles.block}>
                    <h3>Исходный</h3>

                    {result.type === "text" && <p>{result.original}</p>}

                    {result.type === "pdf" && (
                        <>
                            <iframe
                                src={`${result.originalFileUrl}#zoom=page-width`}
                                className={styles.viewer}
                            />

                            <a
                                href={result.originalFileUrl}
                                download="original.pdf"
                                className={styles.downloadBtn}
                            >
                                 Скачать PDF
                            </a>
                        </>
                    )}

                    {result.type === "docx" && (
                        <p>DOCX файл загружен</p>
                    )}
                </div>

                {/* ПРАВАЯ СТОРОНА */}
                <div className={styles.block}>
                    <h3>Исправленный</h3>

                    {result.type === "text" && <p>{result.fixed}</p>}

                    {result.type === "pdf" && (
                        <iframe
                            src={`${result.fixedFileUrl}#zoom=page-width`}
                            className={styles.viewer}
                        />
                    )}

                    {result.type === "docx" && (
                        <a href={result.fixedFileUrl} download>
                            📥 Скачать исправленный файл
                        </a>
                    )}
                </div>

            </div>
        </div>
    );
}