import Axios from "axios";

// import api url from env file
const API_URL = import.meta.env.VITE_APP_API_URL + "/api/chat";

export const sendMessage = async (query: string): Promise<string> => {
  try {
    const response = await Axios.post(API_URL, { query });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message");
  }
};
