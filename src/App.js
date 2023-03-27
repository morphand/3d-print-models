import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useJwt } from "react-jwt";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import Upload from "./components/Upload/Upload";
import Catalog from "./components/Catalog/Catalog";
import Model from "./components/Model/Model";
import EditProfile from "./components/Profile/EditProfile";

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
            <Route path="/profile/:userId/edit" element={<EditProfile />} />
            {isUserLoggedIn && (
              <Route path="/upload" element={<Upload userId={_id} />} />
            )}
            <Route path="/models" element={<Catalog />} />
            <Route path="/models/:id" element={<Model />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
