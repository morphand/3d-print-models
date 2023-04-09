import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import ModelCard from "../Model/ModelCard";
import Search from "../Search/Search";
import styles from "../../styles/Catalog.module.css";
import AuthContext from "../../contexts/Auth";
import RequestSender from "../../utils/RequestSender";

function Catalog() {
  const [models, setModels] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const searchTerm = useRef("");
  const authContext = useContext(AuthContext);
  const isUserLoggedIn = authContext.isUserLoggedIn;
  const getModels = useCallback(async () => {
    const requestSender = new RequestSender();
    const result = await requestSender.get("/catalog");
    setModels(result);
  }, []);

  useEffect(() => {
    getModels();
  }, [getModels]);

  async function handleSearch(e) {
    e.preventDefault();
    setIsSearchLoading(true);
    setModels([]);
    const requestSender = new RequestSender();
    const formData = new FormData();
    formData.append("searchTerm", searchTerm.current.value.trim());
    const result = await requestSender.post("/models/search", {
      data: formData,
    });
    setModels(result);
    setIsSearchLoading(false);
  }

  if (isSearchLoading) {
    return <h3>Searching</h3>;
  }

  return (
    <div className={styles["models"]}>
      <Search onSearch={handleSearch} ref={searchTerm} />
      {models.length ? (
        models.map((model) => <ModelCard key={model._id} model={model} />)
      ) : isUserLoggedIn ? (
        <h3>
          No models found. <Link to="/upload">Upload</Link> yours now.
        </h3>
      ) : (
        <h3>
          No models found. <Link to="/login">Login</Link> or{" "}
          <Link to="/register">register</Link> to upload yours now.
        </h3>
      )}
    </div>
  );
}

export default Catalog;
