import { Header } from "./Header";
import { Book } from "./Book";
import { Friend } from "./Friend";
import { useNavigate } from "react-router-dom";
import "../styles/FriendProfile.css";

export function FriendProfile({ loggedInUser, user, showAddFriend }) {
  const navigate = useNavigate();

  function onReturnHome() {
    navigate("/dashboard");
  }
  return (
    <>
      <div className="header-wrapper">
        <Header loggedInUser={loggedInUser} />
      </div>

      <div className="friend-profile-container">
        <div className="friend-profile-header">
          <button className="back-to-home-button" onClick={onReturnHome}>
            Back to Home
          </button>
          <h1 className="friend-profile-title">{`${user.name}'s Books`}</h1>
          {showAddFriend && (
            <button className="add-friend-button">Add Friend</button>
          )}
        </div>
        <div className="friend-profile-book-grid">
          <ul className="book-grid">
            {user.books.map((book) => (
              <Book
                key={book.id}
                title={book.title}
                author={book.author}
                read={book.read}
                theme={book.genre}
                year={book.publishedYear}
                showDeleteButton={false}
                showRating={false}
                showStatus={false}
              />
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h1 className="friends-section-title">{`${user.name}'s Friends`}</h1>
        <div className="friends-section">
          {user.friends.map((friend) => (
            <div className="friend-item">
              <Friend key={friend.id} name={friend.name} books={friend.books} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
