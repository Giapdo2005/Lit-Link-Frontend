import { useState, useEffect } from "react";
import { StarRating } from "./StarRating";
import "../styles/Book.css";

export function Book({
  id,
  title,
  year,
  author,
  theme,
  onBookStatusChange,
  read,
  onDeleteBook,
}) {
  const statusStyles = {
    0: "status-not-started",
    1: "status-reading",
    2: "status-finished",
  };

  const [isRated, setIsRated] = useState(0);
  const [bookRating, setBookRating] = useState(0);
  const [savedRating, setSavedRating] = useState(false);

  useEffect(() => {
    if (read === 0) {
      setIsRated(0);
      setBookRating(0);
      setSavedRating(false);
    }
  }, [read]);

  function onToggleRating() {
    if (isRated === 0) setIsRated(1);
    if (isRated === 1) setSavedRating(false);
  }

  function handleBookRating(rating) {
    setBookRating(rating);
  }

  function onHandleSaved() {
    setSavedRating(true);
  }

  function onHandleEdit() {
    setSavedRating(false);
  }

  return (
    <li className="book-card">
      <div className="book-card-content">
        <div className="book-content">
          <h3 className="book-title">{title}</h3>
          <div className="book-details">
            <p className="book-author">
              <span className="label">Author:</span> {author}
            </p>
            <p className="book-year">
              <span className="label">Year:</span> {year}
            </p>
            {theme && (
              <p className="book-theme">
                <span className="label">Genre:</span> {theme}
              </p>
            )}
          </div>
        </div>
        <div className="book-status">
          <select
            className={`book-status-select ${statusStyles[read]}`}
            value={read}
            onChange={onBookStatusChange}
          >
            <option value="0">Haven't Started</option>
            <option value="1">In Progress</option>
            <option value="2">Finished</option>
          </select>
        </div>
      </div>
      <div className="book-actions-container">
        <div className="book-actions">
          <button className="book-delete" onClick={onDeleteBook}>
            Delete Book
          </button>
          {read !== 0 && (
            <button className="book-rate" onClick={onToggleRating}>
              {isRated === 1 ? "Edit Rating" : "Rate It"}
            </button>
          )}
        </div>
        {isRated === 1 && read !== 0 && (
          <>
            <div className="rating-container">
              <StarRating
                initialRating={bookRating}
                onRate={handleBookRating}
              />
            </div>
            {!savedRating ? (
              <button className="save-rating-button" onClick={onHandleSaved}>
                Save Rating
              </button>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </li>
  );
}
