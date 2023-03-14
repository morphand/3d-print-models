import styles from "../styles/Profile.module.css";
import { numberFormatter } from "../utils/formatters";

function Profile() {
  const name = "name";
  const downloads = numberFormatter(0);
  const favourites = numberFormatter(0);
  const subscribers = numberFormatter(0);
  return (
    <div className={styles["profile-wrapper"]}>
      <div className={styles["profile-image"]}>
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </div>
      <div className={styles["profile-name"]}>
        <p>{name}</p>
      </div>
      <div className={styles["profile-statistics"]}>
        <div className="profile-uploaded-count">
          {/*<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->*/}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.22 20.75H5.78C5.43322 20.7359 5.09262 20.6535 4.77771 20.5075C4.4628 20.3616 4.17975 20.155 3.94476 19.8996C3.70977 19.6442 3.52745 19.3449 3.40824 19.019C3.28903 18.693 3.23525 18.3468 3.25 18V15C3.25 14.8011 3.32902 14.6103 3.46967 14.4697C3.61033 14.329 3.80109 14.25 4 14.25C4.19892 14.25 4.38968 14.329 4.53033 14.4697C4.67099 14.6103 4.75 14.8011 4.75 15V18C4.72419 18.2969 4.81365 18.5924 4.99984 18.8251C5.18602 19.0579 5.45465 19.21 5.75 19.25H18.22C18.5154 19.21 18.784 19.0579 18.9702 18.8251C19.1564 18.5924 19.2458 18.2969 19.22 18V15C19.22 14.8011 19.299 14.6103 19.4397 14.4697C19.5803 14.329 19.7711 14.25 19.97 14.25C20.1689 14.25 20.3597 14.329 20.5003 14.4697C20.641 14.6103 20.72 14.8011 20.72 15V18C20.75 18.6954 20.5041 19.3744 20.0359 19.8894C19.5677 20.4045 18.9151 20.7137 18.22 20.75Z"
              fill="#000000"
            />
            <path
              d="M12 15.75C11.9015 15.7504 11.8038 15.7312 11.7128 15.6934C11.6218 15.6557 11.5392 15.6001 11.47 15.53L7.47 11.53C7.33752 11.3878 7.2654 11.1997 7.26882 11.0054C7.27225 10.8111 7.35096 10.6258 7.48838 10.4883C7.62579 10.3509 7.81118 10.2722 8.00548 10.2688C8.19978 10.2654 8.38782 10.3375 8.53 10.47L12 13.94L15.47 10.47C15.6122 10.3375 15.8002 10.2654 15.9945 10.2688C16.1888 10.2722 16.3742 10.3509 16.5116 10.4883C16.649 10.6258 16.7277 10.8111 16.7312 11.0054C16.7346 11.1997 16.6625 11.3878 16.53 11.53L12.53 15.53C12.4608 15.6001 12.3782 15.6557 12.2872 15.6934C12.1962 15.7312 12.0985 15.7504 12 15.75Z"
              fill="#000000"
            />
            <path
              d="M12 15.75C11.8019 15.7474 11.6126 15.6676 11.4725 15.5275C11.3324 15.3874 11.2526 15.1981 11.25 15V4C11.25 3.80109 11.329 3.61032 11.4697 3.46967C11.6103 3.32902 11.8011 3.25 12 3.25C12.1989 3.25 12.3897 3.32902 12.5303 3.46967C12.671 3.61032 12.75 3.80109 12.75 4V15C12.7474 15.1981 12.6676 15.3874 12.5275 15.5275C12.3874 15.6676 12.1981 15.7474 12 15.75Z"
              fill="#000000"
            />
          </svg>
          {downloads}
        </div>
        <div className="profile-favorite-count">
          {/*<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->*/}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.2426 20.4853L15.5355 21.1924C15.9261 21.5829 16.5592 21.5829 16.9497 21.1924L16.2426 20.4853ZM16.2426 14.8285L15.5355 15.5356C15.7231 15.7231 15.9774 15.8285 16.2426 15.8285C16.5079 15.8285 16.7622 15.7231 16.9497 15.5356L16.2426 14.8285ZM14.1213 16.9498C13.7308 16.5593 13.7308 15.9261 14.1213 15.5356L12.7071 14.1214C11.5355 15.2929 11.5355 17.1924 12.7071 18.364L14.1213 16.9498ZM16.9497 19.7782L14.1213 16.9498L12.7071 18.364L15.5355 21.1924L16.9497 19.7782ZM18.364 16.9498L15.5355 19.7782L16.9497 21.1924L19.7782 18.364L18.364 16.9498ZM18.364 15.5356C18.7545 15.9261 18.7545 16.5593 18.364 16.9498L19.7782 18.364C20.9497 17.1924 20.9497 15.2929 19.7782 14.1214L18.364 15.5356ZM16.9497 15.5356C17.3403 15.145 17.9734 15.145 18.364 15.5356L19.7782 14.1214C18.6066 12.9498 16.7071 12.9498 15.5355 14.1214L16.9497 15.5356ZM14.1213 15.5356C14.5118 15.145 15.145 15.145 15.5355 15.5356L16.9497 14.1214C15.7782 12.9498 13.8787 12.9498 12.7071 14.1214L14.1213 15.5356Z"
              fill="#000000"
            />
          </svg>
          {favourites}
        </div>
        <div className="profile-subscribers-count">
          {/*<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->*/}
          <svg
            fill="#000000"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z" />
          </svg>
          {subscribers}
        </div>
      </div>
    </div>
  );
}

export default Profile;
