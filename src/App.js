import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useJwt } from "react-jwt";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(localStorage.getItem("auth"));
  const decodedToken = useJwt(token).decodedToken;
  const [_id, set_id] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (decodedToken) {
      set_id(decodedToken._id);
      setUsername(decodedToken.username);
    }
  }, [decodedToken]);
  const isUserLoggedIn = token ? true : false;
  return (
    <div className="App">
      <Navigation
        _id={_id}
        username={username}
        isUserLoggedIn={isUserLoggedIn}
        setToken={setToken}
      />
      <main>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<Home isUserLoggedIn={isUserLoggedIn} />}
            />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
