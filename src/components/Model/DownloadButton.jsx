import { DownloadIcon } from "../Icons/Icons";

function DownloadButton({ onClick }) {
  return (
      <button onClick={onClick}>
        <DownloadIcon /> Download
      </button>
  );
}

export default DownloadButton;
