import { forwardRef } from "react";
import styles from "../../styles/Search.module.css";

const Search = forwardRef(function Search({ onSearch }, ref) {
  return (
    <form className={styles["search"]} onSubmit={onSearch}>
      <input
        type="text"
        name="search"
        id="search"
        ref={ref}
        placeholder="Search models"
      />
      <input type="submit" value="Search" />
    </form>
  );
});

export default Search;
