import { useState } from "react";
import "../styles/AddBookForm.css";
import { set } from "lodash";

export function AddBookForm({ onAddBook }) {
  const [title, setTitle] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [read, setRead] = useState(0);

  function handleAddBook(e) {
    e.preventDefault();

    if (!title || !publishedYear || !author) return;

    const newBook = {
      title: title,
      publishedYear: publishedYear,
      author: author,
      genre: genre,
      read: read,
    };

    onAddBook(newBook);
    setTitle("");
    setPublishedYear("");
    setAuthor("");
    setGenre("");
    setRead(0);
  }

  return (
    <form className="add-book-form" onSubmit={handleAddBook}>
      <h2 className="form-title">Add a New Book</h2>
      <div className="form-group">
        <label htmlFor="title">Book Title</label>
        <input
          id="title"
          type="text"
          value={title}
          placeholder="Enter book title"
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={author}
          placeholder="Enter author name"
          onChange={(e) => setAuthor(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="year">Published Year</label>
        <input
          id="year"
          type="number"
          value={publishedYear}
          placeholder="Enter published year"
          onChange={(e) => setPublishedYear(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          type="text"
          value={genre}
          placeholder="Enter Genre"
          onChange={(e) => setGenre(e.target.value)}
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-button">
        Add Book
      </button>
    </form>
  );
}
