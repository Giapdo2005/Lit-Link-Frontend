import { Friend } from "./Friend";
import "../styles/FriendList.css";

export function FriendList({ friends, loggedInUser, onDeleteFriend }) {
  console.log(friends);
  return (
    <div className="friend-list-container">
      <h2 className="friend-list-title">My Reading Friends</h2>
      <div className="friend-grid">
        {friends
          ? friends.map((friend) => (
              <Friend
                key={friend._id}
                name={friend.fullname}
                books={friend.books}
                deleteFriend={() => onDeleteFriend(friend._id)}
              />
            ))
          : null}
      </div>
    </div>
  );
}
