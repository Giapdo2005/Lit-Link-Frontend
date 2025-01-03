import { User } from "./User";
import "../styles/UserList.css";

export function UserList({ users, onAddFriend, viewProfile }) {
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
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <ul className="user-grid">
        {users.map((user) => (
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
