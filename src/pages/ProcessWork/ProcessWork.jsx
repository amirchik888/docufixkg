import styles from "./ProcessWork.module.css";
import { useState } from "react";

import UploadZone from "./components/UploadZone";
import ToolsPanel from "./components/ToolsPanel";
import ResultsView from "./components/ResultsView";
import ActionsFooter from "./components/ActionsFooter";
import { uploadFile } from "/src/api/api.js";

export default function ProcessWork() {
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
        if (!file || selectedTools.length === 0) return;

        try {
            setLoading(true);

            const type = file.name.endsWith(".pdf") ? "pdf" : "word";

            const res = await uploadFile(file, type, selectedTools);

            setResult(res);

        } catch (e) {
            console.error(e);
            alert("Ошибка при обработке файла");
        } finally {
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