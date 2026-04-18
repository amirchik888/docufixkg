import { useState } from "react";
import { uploadFile, sendText } from "../../api/api";
import { useParams } from "react-router-dom";

export default function ProcessWork() {
    const { type } = useParams(); // resume / contract / application

    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    // 📄 загрузка файла
    const handleFileUpload = async () => {
        if (!file) return alert("Выберите файл");

        try {
            setLoading(true);

            const fileType = file.name.endsWith(".pdf") ? "pdf" : "word";

            const res = await uploadFile(file, fileType);

            setResult(JSON.stringify(res, null, 2));
        } catch (e) {
            console.error(e);
            alert("Ошибка загрузки");
        } finally {
            setLoading(false);
        }
    };

    // 📝 отправка текста
    const handleText = async () => {
        if (!text.trim()) return;

        try {
            setLoading(true);

            const res = await sendText(text);

            setResult(JSON.stringify(res, null, 2));
        } catch (e) {
            console.error(e);
            alert("Ошибка обработки текста");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1>Обработка рабочих документов</h1>

            <p>Тип документа: <b>{type}</b></p>

            {/* FILE */}
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={handleFileUpload} disabled={loading}>
                {loading ? "Загрузка..." : "Отправить файл"}
            </button>

            <hr />

            {/* TEXT */}
            <textarea
                placeholder="Вставьте текст документа"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ width: "100%", height: "120px" }}
            />

            <button onClick={handleText} disabled={loading}>
                {loading ? "Обработка..." : "Отправить текст"}
            </button>

            <hr />

            {/* RESULT */}
            <h3>Результат:</h3>
            <pre
                style={{
                    background: "#f5f5f5",
                    padding: "10px",
                    borderRadius: "8px",
                    overflowX: "auto"
                }}
            >
        {result}
      </pre>
        </div>
    );
}