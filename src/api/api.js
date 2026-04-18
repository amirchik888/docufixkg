const BASE_URL = "http://127.0.0.1:8000";

export const uploadFile = async (file, type, tools) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("tools", JSON.stringify(tools));

    const url = type === "pdf" ? "/api/pdf/" : "/api/word/";

    const res = await fetch(BASE_URL + url, {
        method: "POST",
        body: formData
    });

    if (!res.ok) throw new Error("Ошибка сервера");

    return await res.json();
};