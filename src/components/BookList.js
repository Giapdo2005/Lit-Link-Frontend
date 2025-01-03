import { Book } from "./Book";
import "../styles/BookList.css";

export function BookList({
  books,
  status,
  onBookStatusChange,
  onFilterBooks,
  onDeleteBook,
  loggedInUser,
}) {
  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h2 className="book-list-title">My Books</h2>
        <div className="filter-section">
          <label htmlFor="status-filter">Filter by status:</label>
          <select
            id="status-filter"
            className="status-filter"
            value={status}
            onChange={onFilterBooks}
          >
            <option value="all">All Books</option>
            <option value="reading">Reading</option>
            <option value="finished">Finished</option>
          </select>
        </div>
      </div>
      <div className="book-grid">
        {status === "all" &&
          books.map((book) => {
            const { _id, title, author, publishedYear, genre, read } = book;
            return (
              <Book
                key={_id}
                title={title}
                year={publishedYear}
                author={author}
                theme={genre}
                read={read}
                onBookStatusChange={(e) => onBookStatusChange(_id, e)}
                onDeleteBook={() => onDeleteBook(_id)}
                showDeleteButton={true}
                showRating={true}
                showStatus={true}
              />
            );
          })}
        {status === "reading" &&
          books
            .filter((book) => book.read === 1)
            .map((book) => {
              const { _id, title, author, publishedYear, genre, read } = book;
              return (
                <Book
                  key={_id}
                  title={title}
                  year={publishedYear}
                  author={author}
                  theme={genre}
                  read={read}
                  onBookStatusChange={(e) => onBookStatusChange(_id, e)}
                  onDeleteBook={() => onDeleteBook(_id)}
                />
              );
            })}
        {status === "finished" &&
          books
            .filter((book) => book.read === 2)
            .map((book) => {
              const { _id, title, author, publishedYear, genre, read } = book;
              return (
                <Book
                  key={_id}
                  title={title}
                  year={publishedYear}
                  author={author}
                  theme={genre}
                  read={read}
                  onBookStatusChange={(e) => onBookStatusChange(_id, e)}
                  onDeleteBook={() => onDeleteBook(_id)}
                />
              );
            })}
      </div>
    </div>
  );
}
