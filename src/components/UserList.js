import { User } from "./User";
import { useState, useEffect } from "react";
import { searchUser } from "../api";
import "../styles/UserList.css";

export function UserList({ users, onAddFriend, viewProfile }) {
  const [queries, setQueries] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!queries) {
      setFilteredUsers(users);
      return;
    }

    const searching = async () => {
      if (queries.trim() === "") return;
      try {
        const users = await searchUser(queries);
        console.log("Search results:", users);
        setFilteredUsers(users);
      } catch (error) {
        console.error("searching -> failed", error.message);
      }
    };

    searching();
  }, [queries, users]);

  function onHandleQuery(e) {
    console.log(e.target.value);
    setQueries(e.target.value);
  }
  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2 className="user-list-title">Reading Community</h2>
        <p className="user-list-subtitle">Connect with other readers</p>
      </div>

      <div className="search-filter-section">
        <div className="search-wrapper">
          <input
            type="text"
            className="user-search"
            placeholder="Search readers..."
            onChange={onHandleQuery}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <ul className="user-grid">
        {filteredUsers.map((user) => (
          <li key={user._id} className="user-grid-item">
            <User
              name={user.fullname}
              books={user.books}
              onAddFriend={() => onAddFriend(user._id)}
              viewProfile={() => viewProfile(user)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
