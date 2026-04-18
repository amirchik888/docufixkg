import styles from "./ActionsFooter.module.css";

export default function ActionsFooter() {
    return (
        <div className={styles.footer}>
            <button className={styles.primary}>Скачать</button>
            <button>Попробовать еще раз</button>
            <button>Сохранить</button>
        </div>
    );
}