import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModelCard from "../Model/ModelCard";
import styles from "../../styles/Catalog.module.css";
import AuthContext from "../../contexts/Auth";

function Catalog() {
  const [models, setModels] = useState([]);
  const authContext = useContext(AuthContext);
  const isUserLoggedIn = authContext.isUserLoggedIn;
  useEffect(() => {
    fetch("http://localhost:5000/api/catalog")
      .then((res) => res.json())
      .then((res) => setModels(res))
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <h3>Catalog</h3>
      <div className={styles["models"]}>
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
    </>
  );
}

export default Catalog;
