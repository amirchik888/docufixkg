import styles from "./ToolsPanel.module.css";

const tools = [
    { id: "grammar", label: "✏️ Орфография" },
    { id: "logic", label: "🔍 Логика" },
    { id: "improve", label: "➕ Улучшение" }
];

export default function ToolsPanel({ selectedTools, toggleTool, onAnalyze }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.tools}>
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        className={`${styles.tool} ${
                            selectedTools.includes(tool.id) ? styles.active : ""
                        }`}
                        onClick={() => toggleTool(tool.id)}
                    >
                        {tool.label}
                    </button>
                ))}
            </div>

            <button
                className={styles.analyze}
                disabled={selectedTools.length === 0}
                onClick={onAnalyze}
            >
                Анализировать
            </button>
        </div>
    );
}