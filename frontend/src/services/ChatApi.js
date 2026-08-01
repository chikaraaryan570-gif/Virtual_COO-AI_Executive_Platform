import api from "./api";

export async function sendMessage(message) {
    console.log("Sending request...");

    try {
        const response = await api.post("/chat", {
            message,
        });

        console.log("Response:", response);

        return response.data;

    } catch (err) {
        console.error("API ERROR:", err);

        throw err;
    }
}