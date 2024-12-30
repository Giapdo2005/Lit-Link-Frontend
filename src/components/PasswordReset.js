import { useState } from "react";
import { checkUser } from "../api";

export function PasswordReset() {
  const [email, setEmail] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function checkingUser() {
    try {
      const response = await checkUser(email);

      if (response !== "User does exist") {
        setError("Please enter an existing email or create an account");
        setValidUser(false);
      }

      setValidUser(true);
    } catch (error) {
      console.error("Checking User -> unsuccessful", error);
      setError("An error occurred while checking the user. Please try again.");
    }
  }

  async function resetPassword() {
    setLoading(true);
    setError(null);

    //
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validUser) {
      resetPassword(password);
    }

    checkingUser();
  };

  return (
    <div className="password-reset">
      <div className="welcome-section">
        <div className="logo-container">
          <span className="logo-emoji">📚</span>
          <h1 className="logo-text">LitLink</h1>
        </div>
        <p className="welcome-text">Share your reading journey with friends</p>
      </div>

      <div className="reset-card">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {validUser && (
            <div>
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter a new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading || (validUser && !password)}>
            {validUser ? "Submit New Password" : "Submit email"}
          </button>
        </form>
      </div>
    </div>
  );
}
