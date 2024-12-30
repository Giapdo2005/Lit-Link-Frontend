// config.js
require("dotenv").config();

export const googleKey = process.env.GOOGLE_BOOKS_API_KEY;

// api.js
import { googleKey } from "./config";

const API_BASE_URL = "http://localhost:3000/api";

export const addBook = async (bookData) => {
  try {
    console.log(googleKey); // Now this should log the API key
    // ... rest of your addBook function code
  } catch (error) {
    console.error("addBook -> error", error);
    throw error;
  }
};

// ... other exports
