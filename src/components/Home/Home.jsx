import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StlViewer } from "react-stl-viewer";
import ModelCard from "../Model/ModelCard";
import styles from "../../styles/Home.module.css";

function Home({ isUserLoggedIn }) {
  const [featuredModels, setFeaturedModels] = useState([]);
  const url =
    "http://localhost:5000/uploads/642155b60b25724752792bdd/model name/Sample.stl";
  const style = {
    width: "100%",
    height: "100%",
  };
  useEffect(() => {
    fetch("http://localhost:5000/api/featuredModels")
      .then((res) => res.json())
      .then((res) => setFeaturedModels(res))
      .catch((e) => console.log(e));
  }, []);
  console.log(featuredModels);
  return (
    <>
      <article className={styles["hero"]}>
        <div className="hero-left">
          <p>
            Upload your
            <br />
            <span>STL/OBJ/3MF</span>
            <br />
            <small>designs and share them with others!</small>
            <br />
            {!isUserLoggedIn ? (
              <>
                <small className="hero-left-links">
                  <Link to="/login">Login</Link> or{" "}
                  <Link to="/register">register</Link> now.
                </small>
              </>
            ) : (
              <>
                <small className="hero-left-links">
                  View the <Link to="/models">models</Link> now.
                </small>
              </>
            )}
          </p>
        </div>
        <div className="hero-right">
          <StlViewer
            style={style}
            orbitControls
            shadows
            url={url}
            modelProps={{ scale: 2 }}
          />
        </div>
      </article>
      <article className="featured">
        <h3>Featured models</h3>
        {featuredModels.length ? (
          <div className={styles["featured-models"]}>
            {featuredModels.map((model) => (
              <ModelCard key={model._id} model={model} />
            ))}
          </div>
        ) : (
          <h3>There are no featured models at this time.</h3>
        )}
      </article>
    </>
  );
}

export default Home;
