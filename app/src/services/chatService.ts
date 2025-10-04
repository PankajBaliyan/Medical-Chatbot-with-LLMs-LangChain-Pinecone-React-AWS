import Axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/chat";

export const sendMessage = async (query: string): Promise<string> => {
  try {
    const response = await Axios.post(API_URL, { query });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message");
  }
};
