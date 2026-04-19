import styles from "./ProcessWork.module.css";
import { useState, useEffect } from "react";

import UploadZone from "./components/UploadZone";
import ToolsPanel from "./components/ToolsPanel";
import ResultsView from "./components/ResultsView";
import ActionsFooter from "./components/ActionsFooter";

export default function ProcessWork() {
    const [textInput] = useState(""); // пока не используешь — ок
    const [file, setFile] = useState(null);
    const [selectedTools, setSelectedTools] = useState([]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const toggleTool = (tool) => {
        setSelectedTools((prev) =>
            prev.includes(tool)
                ? prev.filter((t) => t !== tool)
                : [...prev, tool]
        );
    };

    const handleAnalyze = async () => {
        if (!file && !textInput) return;

        setLoading(true);

        try {
            let url = "";
            let response;

            // 📄 ФАЙЛ
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                url = file.type.includes("pdf")
                    ? "http://127.0.0.1:8000/api/pdf/"
                    : "http://127.0.0.1:8000/api/word/";

                response = await fetch(url, {
                    method: "POST",
                    body: formData,
                });

            } else {
                // 📝 TEXT (JSON!)
                url = "http://127.0.0.1:8000/api/text/";

                response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: textInput }),
                });
            }

            if (!response.ok) {
                throw new Error("Ошибка сервера");
            }

            const contentType = response.headers.get("content-type");

            // ✅ JSON ответ (текст)
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();

                setResult({
                    type: "text",
                    original: data.original || data.text || "",
                    fixed: data.fixed || data.corrected || "",
                    issues: data.issues || [],
                });

            } else {
                // ✅ FILE ответ (pdf/docx)
                const blob = await response.blob();

                const fixedFileUrl = URL.createObjectURL(blob);
                const originalFileUrl = file
                    ? URL.createObjectURL(file)
                    : null;

                setResult({
                    type: file.name.endsWith(".pdf")
                        ? "pdf"
                        : file.name.endsWith(".docx")
                            ? "docx"
                            : "file",

                    originalFileUrl,
                    fixedFileUrl,
                    issues: [],
                });
            }

        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка при анализе");
        } finally {
            setLoading(false);
        }
    };

    // 🧹 очистка blob URL (важно)
    useEffect(() => {
        return () => {
            if (result?.fixedFileUrl) {
                URL.revokeObjectURL(result.fixedFileUrl);
            }
            if (result?.originalFileUrl) {
                URL.revokeObjectURL(result.originalFileUrl);
            }
        };
    }, [result]);

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