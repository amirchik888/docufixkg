import { useState } from "react";
import { uploadFile, } from "/src/api/api";

async function sendText() {
    
}

export default function ProcessStudy() {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [result, setResult] = useState("");

    // 📄 загрузка файла
    const handleFileUpload = async () => {
        if (!file) return alert("Выбери файл");

        try {
            const type = file.name.endsWith(".pdf") ? "pdf" : "word";

            const res = await uploadFile(file, type);
            setResult(JSON.stringify(res, null, 2));
        } catch (e) {
            console.error(e);
        }
    };

    // 📝 отправка текста
    const handleText = async () => {
        if (!text) return;

        try {
            const res = await sendText(text);
            setResult(JSON.stringify(res, null, 2));
        } catch (e) {
            console.error(e);
        }
    };

    return ( 
        <div style={{ padding: "40px" }}>
            <h1>Обработка документа</h1>

            {/* FILE */}
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={handleFileUpload}>
                Отправить файл
            </button>

            <hr />

            {/* TEXT */}
            <textarea
                placeholder="Вставь текст"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button onClick={handleText}>
                Отправить текст
            </button>

            <hr />

            {/* RESULT */}
            <pre>
        {result}
      </pre>
        </div>
    );
}