import axios from "axios";

const API_BASE_URL = "https://lit-link-backend-4.onrender.com/api";
const API_BASE_TEST = "http://localhost:3000/api";

// get all books from database
export const fetchBooks = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("fetchBooks -> error", error);
  }
};

// get all users from database
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("fetchUsers -> error", error);
  }
};

// add book to loggedInUser to the database
export const addBook = async (id, bookData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/books/${id}`,
      bookData
    );
    return response.data.book;
  } catch (error) {
    console.error("addBook -> error", error);
    throw error;
  }
};

// update book status of loggedInUser to the database
export const updateBookStatus = async (userId, bookId, status) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/${userId}/books/${bookId}`,
      {
        read: status,
      }
    );
    return response.data;
  } catch (error) {
    console.error("updateBookStatus -> error", error);
    throw error;
  }
};

// delete book from the database
export const deleteSelectedBook = async (userId, bookId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/users/${userId}/books/${bookId}`
    );
    return response.data;
  } catch (error) {
    console.error("deleteBook -> error", error);
    throw error;
  }
};

// check if user exists for login auth
export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      email,
      password,
    });
    return response.data.user;
  } catch (error) {
    console.error("login unsuccessful", error.response?.data || error.message);
    throw error;
  }
};

// signup route
export const handleSignup = async (fullname, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/signup`, {
      fullname,
      email,
      password,
    });
    return response.data.user;
  } catch (error) {
    console.error("Signup unsuccessful", error.response?.data || error.message);
  }
};

// addFriend route
export const addFriend = async (userId, friendId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/${userId}/friends/${friendId}`
    );

    console.log(response.data.friend);
    return response.data.friend;
  } catch (error) {
    console.error("Add Friend unsuccessfully", error.message);
  }
};

// deleteFriend route
export const deleteFriend = async (userId, friendId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/users/${userId}/friends/${friendId}`
    );
    return response.data.deletedFriend;
  } catch (error) {
    console.error("deleteFriend unsuccessful", error.message);
  }
};

// check if user exists
export const checkUser = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/check`, {
      email,
    });
    return response.data.message;
  } catch (error) {
    console.error("checkUser -> not found", error.message);
  }
};

export const resetPassword = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/password-reset`, {
      email,
      password,
    });

    return response;
  } catch (error) {
    console.error("resetting Password -> unsuccessful");
  }
};

// get user info from id
export const getUserData = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);

    return response.data.user;
  } catch (error) {
    console.error("couldn't retrieve userData");
  }
};

// search users
export const searchUser = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_TEST}/search-users?q=${name}`);
    return response.data;
  } catch (error) {
    console.error("Couldn't search user", error);
  }
};
