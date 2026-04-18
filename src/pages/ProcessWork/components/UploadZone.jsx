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
                    <input type="file" onChange={handleFile} />
                </>
            ) : (
                <p className={styles.fileName}>{file.name}</p>
            )}
        </div>
    );
}