import { User } from "./User";
import { useState, useEffect } from "react";
import { searchUser } from "../api";
import "../styles/UserList.css";
import { filter } from "lodash";

export function UserList({
  users,
  onAddFriend,
  viewProfile,
  loggedInUser,
  friends,
}) {
  const [queries, setQueries] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [loading, setLoading] = useState(false);

  console.log(friends);

  useEffect(() => {
    if (!queries) {
      setFilteredUsers(users);
      return;
    }

    const searching = async () => {
      setLoading(true);
      try {
        const users = await searchUser(queries);
        const friendIds = friends.map((friend) => friend._id);
        console.log(friendIds);
        const filtered = users.filter(
          (user) => user._id !== loggedInUser && !friendIds.includes(user._id)
        );
        setFilteredUsers(filtered);
      } catch (error) {
        console.error("searching -> failed", error.message);
      } finally {
        setLoading(false);
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

      {filteredUsers.length > 0 ? (
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
      ) : (
        !loading && <p className="no-users-message">No users found 😞</p> // Message when no users are found
      )}
    </div>
  );
}
