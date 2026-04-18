const BASE_URL = "http://127.0.0.1:8000";

// 📄 PDF / WORD
export const uploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);

    let url = "";

    if (type === "pdf") url = "/api/pdf/";
    if (type === "word") url = "/api/word/";

    const res = await fetch(BASE_URL + url, {
        method: "POST",
        body: formData
    });

    if (!res.ok) throw new Error("Ошибка загрузки файла");

    return await res.json();
};

// 📝 TEXT
export const sendText = async (text) => {
    const res = await fetch(BASE_URL + "/api/text/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

    if (!res.ok) throw new Error("Ошибка обработки текста");

    return await res.json();
};