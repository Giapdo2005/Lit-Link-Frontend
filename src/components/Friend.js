import "../styles/User.css";

export function Friend({ name, books, deleteFriend, viewProfile }) {
  const latestBooks = books
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(-3);

  return (
    <div className="user-card">
      <div className="user-header">
        <div className="user-avatar">1</div>
        <div className="user-info">
          <h3 className="user-name">{name}</h3>
          <span className="books-count">{books.length} books</span>
        </div>
      </div>
      <div className="user-books">
        <h4 className="recent-books-title">Recent Books</h4>
        <ul className="books-list">
          {latestBooks.map((book) => (
            <li key={book._id} className="book-item">
              <span className="book-icon">📚</span>
              {book.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="user-actions">
        <button className="view-profile" onClick={viewProfile}>
          View Profile
        </button>
        <button className="add-friend" onClick={deleteFriend}>
          Remove Friend
        </button>
      </div>
    </div>
  );
}

export default Friend;
