import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Footer from "./components/Footer";

function App() {
  // token: { _id: '1234', username: 'user' }
  let token = localStorage.getItem("auth");
  if (!token) {
    token = {
      _id: 1234,
      username: "user",
    };
  }
  const isUserLoggedIn = token ? true : false;
  console.log(token);
  return (
    <div className="App">
      <Navigation token={token} isUserLoggedIn={isUserLoggedIn} />
      <main>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<Home isUserLoggedIn={isUserLoggedIn} />}
            />
            <Route path="/login" element={<Login />} />
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
