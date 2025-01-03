import { Header } from "./Header";
import { Book } from "./Book";
import { Friend } from "./Friend";
import "../styles/FriendProfile.css";

const Friends = [
  {
    id: 1,
    fullname: "Alice Johnson",
    books: [
      {
        id: 1,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Classic Fiction",
        publishedYear: 1813,
        rating: 4.7,
        read: 1,
        createdAt: "2025-01-01T10:15:30Z",
      },
      {
        id: 2,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        publishedYear: 1937,
        rating: 4.8,
        read: 0,
        createdAt: "2025-01-01T11:20:45Z",
      },
    ],
  },
  {
    id: 2,
    fullname: "Bob Smith",
    books: [
      {
        id: 3,
        title: "Moby-Dick",
        author: "Herman Melville",
        genre: "Adventure",
        publishedYear: 1851,
        rating: 4.3,
        read: 0,
        createdAt: "2025-01-01T12:35:00Z",
      },
      {
        id: 4,
        title: "War and Peace",
        author: "Leo Tolstoy",
        genre: "Historical Fiction",
        publishedYear: 1869,
        rating: 4.6,
        read: 1,
        createdAt: "2025-01-01T13:45:15Z",
      },
    ],
  },
  {
    id: 3,
    fullname: "Charlie Davis",
    books: [
      {
        id: 5,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Young Adult",
        publishedYear: 1951,
        rating: 4.3,
        read: 1,
        createdAt: "2025-01-01T14:10:25Z",
      },
      {
        id: 6,
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Philosophical Fiction",
        publishedYear: 1988,
        rating: 4.5,
        read: 0,
        createdAt: "2025-01-01T15:30:40Z",
      },
    ],
  },
];

export function FriendProfile({ loggedInUser, user }) {
  return (
    <>
      <div className="header-wrapper">
        <Header loggedInUser={loggedInUser} />
      </div>

      <div className="friend-profile-container">
        <div className="friend-profile-header">
          <h1 className="friend-profile-title">{`${user.name}'s Books`}</h1>
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
