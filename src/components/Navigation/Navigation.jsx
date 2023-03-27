import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Navigation.module.css";

function Navigation({ isUserLoggedIn, _id, username, setToken }) {
  const [isProfileDropdownActive, setIsProfileDropdownActive] = useState(false);
  function Logout() {
    localStorage.clear();
    setToken(null);
  }
  return (
    <nav className={styles["nav"]}>
      <div className="nav-left">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/models">Catalog</Link>
          </li>
          {isUserLoggedIn ? (
            // Logged in navigation
            <>
              <li>
                <Link to="/upload">Upload</Link>
              </li>
            </>
          ) : (
            // Not logged in navigation
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {isUserLoggedIn && (
        <div className="nav-right">
          <ul>
            {/* Logged in navigation */}
            <li className="nav-right-profile-link">
              <div className="nav-right-profile-link-username">
                {username}
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setIsProfileDropdownActive(!isProfileDropdownActive);
                  }}
                >
                  {!isProfileDropdownActive ? (
                    <>
                      {/* <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> */}
                      <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 472.615 472.615"
                      >
                        <g>
                          <g>
                            <rect y="377.561" width="472.615" height="65.035" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect y="188.81" width="472.615" height="65.035" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect y="0.02" width="472.615" height="65.035" />
                          </g>
                        </g>
                      </svg>
                    </>
                  ) : (
                    <>
                      {/* <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> */}
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                        />
                      </svg>
                    </>
                  )}
                </div>
                {isProfileDropdownActive && (
                  <div className="nav-right-profile-link-dropdown">
                    <Link to={`/profile/${_id}`}>Profile</Link>
                    <Link to={`/`} onClick={Logout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
