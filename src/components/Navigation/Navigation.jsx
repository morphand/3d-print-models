import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, CloseIcon } from "../Icons/Icons";
import styles from "../../styles/Navigation.module.css";
import AuthContext from "../../contexts/Auth";

function Navigation() {
  const [isProfileDropdownActive, setIsProfileDropdownActive] = useState(false);
  const authContext = useContext(AuthContext);
  const userId = authContext.userId;
  const username = authContext.username;
  const isUserLoggedIn = authContext.isUserLoggedIn;
  const setToken = authContext.setToken;
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
                  onClick={() => {
                    setIsProfileDropdownActive(!isProfileDropdownActive);
                  }}
                >
                  {!isProfileDropdownActive ? <MenuIcon /> : <CloseIcon />}
                </div>
                {isProfileDropdownActive && (
                  <div className="nav-right-profile-link-dropdown">
                    <Link to={`/profile/${userId}`}>Profile</Link>
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
