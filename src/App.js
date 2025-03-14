import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AddBookForm } from "./components/AddBookForm";
import { BookList } from "./components/BookList";
import { Header } from "./components/Header";
import { FriendList } from "./components/FriendList";
import { Home } from "./components/Home";
import { UserList } from "./components/UserList";
import { PasswordReset } from "./components/PasswordReset";
import { FriendProfile } from "./components/FriendsProfile";
import { useNavigate } from "react-router-dom";
import {
  fetchBooks,
  fetchUsers,
  addBook,
  updateBookStatus,
  deleteSelectedBook,
  addFriend,
  deleteFriend,
  getUserData,
} from "./api";
import "./styles/Index.css";

export default function App() {
  const [books, setBooks] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectStatus, setSelectStatus] = useState("all");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAlreadyFriend, setIsAlreadyFriend] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadBooksandUsers = async () => {
      if (!loggedInUser) {
        setUsers([]);
        setBooks([]);
        setFriends([]);
        return;
      }
      try {
        //fetch user's books
        const { books } = await fetchBooks(loggedInUser);
        setBooks(books);

        const { users } = await fetchUsers();
        console.log(`Users: ${users}`);

        const loggedInUserFriends = users.find(
          (user) => user._id === loggedInUser
        )?.friends;

        const userFriends = users.filter(
          (user) =>
            loggedInUserFriends && loggedInUserFriends.includes(user._id)
        );
        setFriends(userFriends);

        //fetch users on the database expect for loggedInUser and friends
        const displayedUsers = users.filter(
          (user) =>
            user._id !== loggedInUser && !loggedInUserFriends.includes(user._id)
        );
        setUsers(displayedUsers);
      } catch (error) {
        console.error("loadBooks -> error", error);
      }
    };

    loadBooksandUsers();
  }, [loggedInUser]);

  async function onAddBook(newBook) {
    console.log(loggedInUser);
    try {
      const addedBook = await addBook(loggedInUser, newBook);
      console.log("book added");
      console.log(addedBook);
      setBooks((prevBooks) => [...prevBooks, addedBook]);
    } catch (error) {
      console.error("onAddBook -> error", error);
    }
  }

  async function handleBookStatusChange(bookId, e) {
    const newState = Number(e.target.value);
    console.log(newState);
    console.log(bookId);

    try {
      const response = await updateBookStatus(loggedInUser, bookId, newState);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId ? { ...book, read: newState } : book
        )
      );
      console.log(books);
      console.log(response);
    } catch (error) {
      console.error("handleBookStatusChange -> error", error);
    }
  }

  function handleFilterBooks(e) {
    setSelectStatus(e.target.value);
  }

  async function handleDeleteBook(bookId) {
    try {
      await deleteSelectedBook(loggedInUser, bookId);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("handleDeleteBook -> error", error);
    }
  }

  function onLoggedIn(id, fullname) {
    setLoggedInUser(id);
    setName(fullname);
  }

  function onLogout() {
    setLoggedInUser(null);
    navigate("/");
  }

  async function onAddFriend(friendId) {
    console.log("clicked");
    try {
      const newFriend = await addFriend(loggedInUser, friendId);
      setFriends((prevFriends) => [...prevFriends, newFriend]);

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== newFriend._id)
      );
    } catch (error) {
      console.error("onAddFriend -> error", error);
    }
  }

  async function onDeleteFriend(friendId) {
    console.log(friendId);
    try {
      const deletedFriend = await deleteFriend(loggedInUser, friendId);
      console.log(deletedFriend);
      console.log("Friend deleted successfully");

      setUsers((prevUsers) => [...prevUsers, deletedFriend]);
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend._id !== deletedFriend._id)
      );
    } catch (error) {
      console.error("delete friend unsuccessfully");
    }
  }

  async function onHandleViewProfile(user) {
    console.log(user);
    const userData = await getUserData(user._id);
    console.log(userData);
    setProfile(userData);
    if (friends.some((friend) => friend._id === user._id)) {
      setIsAlreadyFriend(true);
    } else {
      setIsAlreadyFriend(false);
    }

    navigate("/friends-profile");
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home loggedIn={onLoggedIn} />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route
          path="/dashboard"
          element={
            loggedInUser ? (
              <>
                <Header onLogout={onLogout} loggedInUser={name} />
                <AddBookForm onAddBook={onAddBook} />
                <BookList
                  books={books}
                  status={selectStatus}
                  onBookStatusChange={handleBookStatusChange}
                  onFilterBooks={handleFilterBooks}
                  onDeleteBook={handleDeleteBook}
                  loggedInUser={name}
                />
                <FriendList
                  friends={friends}
                  loggedInUser={name}
                  onDeleteFriend={onDeleteFriend}
                  viewProfile={onHandleViewProfile}
                />
                <UserList
                  users={users}
                  onAddFriend={onAddFriend}
                  viewProfile={onHandleViewProfile}
                  loggedInUser={loggedInUser}
                  friends={friends}
                />
              </>
            ) : (
              <Home loggedIn={onLoggedIn} />
            )
          }
        />
        <Route
          path="/friends-profile"
          element={
            <FriendProfile
              loggedInUser={name}
              user={profile}
              showAddFriend={isAlreadyFriend ? false : true}
              addFriend={onAddFriend}
              onLogout={onLogout}
            />
          }
        />
      </Routes>
    </div>
  );
}
