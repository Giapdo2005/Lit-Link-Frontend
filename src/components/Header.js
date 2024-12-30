import "../styles/Header.css";

export function Header({ onLogout, loggedInUser }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">📚</span>
          <h1 className="logo-text">LitLink</h1>
        </div>
        <div className="welcome-message">
          <h2>{`Welcome back ${loggedInUser}`}</h2>
        </div>
        <nav className="nav-links">
          <button className="nav-button">My Books</button>
          <button className="nav-button">Friends</button>
          <button className="nav-button primary" onClick={onLogout}>
            Log Out
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
