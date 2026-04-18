import styles from "./ProcessWork.module.css";
import { useState } from "react";

import UploadZone from "./components/UploadZone";
import ToolsPanel from "./components/ToolsPanel";
import ResultsView from "./components/ResultsView";
import ActionsFooter from "./components/ActionsFooter";


export default function ProcessWork() {
    const [textInput] = useState(""); // если есть ввод текста
    const [file, setFile] = useState(null);
    const [selectedTools, setSelectedTools] = useState([]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const toggleTool = (tool) => {
        setSelectedTools((prev) => {
            if (prev.includes(tool)) {
                return prev.filter((t) => t !== tool);
            }
            return [...prev, tool];
        });
    };

    const handleAnalyze = async () => {
        if (!file && !textInput) return;

        setLoading(true);

        try {
            let url = "";
            const formData = new FormData();

            if (file) {
                formData.append("file", file);

                if (file.type.includes("pdf")) {
                    url = "http://localhost:8000/api/pdf/";
                } else {
                    url = "http://localhost:8000/api/word/";
                }
            } else {
                url = "http://localhost:8000/api/text/";
                formData.append("text", textInput);
            }

            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            // 🔥 ВАЖНО: проверка ответа
            if (!response.ok) {
                throw new Error("Ошибка сервера");
            }

            const contentType = response.headers.get("content-type");

            // 👉 JSON
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();

                setResult({
                    type: "text",
                    original: data.original,
                    fixed: data.fixed,
                });

            } else {
                // 👉 файл
                const blob = await response.blob();

                const fileUrl = URL.createObjectURL(blob);

                setResult({
                    type: file.type.includes("pdf") ? "pdf" : "docx",
                    originalFile: file,
                    fixedFileUrl: fileUrl,
                });
            }

        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка при анализе");
        } finally {
            // 🔥 ГАРАНТИЯ что лоадер выключится
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.page}>
                <UploadZone file={file} setFile={setFile} />

                <ToolsPanel
                    selectedTools={selectedTools}
                    toggleTool={toggleTool}
                    onAnalyze={handleAnalyze}
                />

                <ResultsView result={result} loading={loading} />

                {result && <ActionsFooter />}
            </div>
        </div>
    );
}