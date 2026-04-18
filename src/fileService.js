// fileService.js
import API from "./api.jsx";

export const processFile = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file); // ключ должен совпадать с Django

    const endpoint =
        type === "pdf" ? "/api/pdf/" : "/api/word/";

    const response = await API.post(endpoint, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // КРИТИЧНО
    });

    return response;
};