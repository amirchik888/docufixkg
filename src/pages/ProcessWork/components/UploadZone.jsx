import styles from "./UploadZone.module.css";

export default function UploadZone({ file, setFile }) {
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className={styles.card}>
            {!file ? (
                <>
                    <p className={styles.title}>Загрузите документ</p>

                    {/* кастомная кнопка */}
                    <label className={styles.uploadBtn}>
                        📎 Выберите файл
                        <input type="file" onChange={handleFile} hidden />
                    </label>
                </>
            ) : (
                <p className={styles.fileName}>📄 {file.name}</p>
            )}
        </div>

    );
}