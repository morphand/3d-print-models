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
import EditModel from "./components/Model/EditModel";
import Toast from "./components/Toast/Toast";
import RouteGuard from "./components/RouteGuard";
import AuthContext from "./contexts/Auth";
import ToastContext from "./contexts/Toast";

function App() {
  const [token, setToken] = useState(localStorage.getItem("auth"));
  const decodedToken = useJwt(token).decodedToken;
  const [_id, set_id] = useState("");
  const [username, setUsername] = useState("");
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isToastShown, setIsToastShown] = useState(false);
  const [toastHeader, setToastHeader] = useState("");
  const [toastContent, setToastContent] = useState("");
  const authContextValues = token
    ? {
        userId: _id,
        username: username,
        isUserLoggedIn: token ? true : false,
        isUserAdmin: isUserAdmin,
        token: token,
        setToken: setToken,
      }
    : {
        setToken: setToken,
      };
  const toastContextValues = { showToast: showToast };

  useEffect(() => {
    if (decodedToken) {
      set_id(decodedToken._id);
      setUsername(decodedToken.username);
      setIsUserAdmin(decodedToken.isAdmin);
    }
  }, [decodedToken]);

  function showToast(header, content) {
    setToastHeader(header);
    setToastContent(content);
    setIsToastShown(true);
    setTimeout(() => {
      setIsToastShown(false);
      setToastHeader("");
      setToastContent("");
    }, 3000);
  }

  return (
    <div className="App">
      <AuthContext.Provider value={authContextValues}>
        <ToastContext.Provider value={toastContextValues}>
          <Navigation />
          {isToastShown && (
            <Toast header={toastHeader} content={toastContent} />
          )}
          <main>
            <div className="container">
              <Routes>
                {/* Routes available for everyone */}
                <Route path="/" element={<Home />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/models" element={<Catalog />} />
                <Route path="/models/:id" element={<Model />} />
                <Route path="*" element={<h1>404</h1>} />

                {/* Routes available for logged out users */}
                <Route element={<RouteGuard requireUserLoggedOut />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>

                {/* Routes available for logged in users */}
                <Route element={<RouteGuard requireUserLoggedIn />}>
                  <Route
                    path="/profile/:userId/edit"
                    element={<EditProfile />}
                  />
                  <Route path="/models/:id/edit" element={<EditModel />} />
                  <Route path="/upload" element={<Upload />} />
                </Route>
              </Routes>
            </div>
          </main>
          <Footer />
        </ToastContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
