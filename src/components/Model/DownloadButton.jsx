import { Link } from "react-router-dom";
import { DownloadIcon } from "../Icons/Icons";

function DownloadButton({ file, onClick }) {
  return (
    <Link to={file}>
      <button >
        <DownloadIcon /> Download
      </button>
    </Link>
  );
}

export default DownloadButton;
