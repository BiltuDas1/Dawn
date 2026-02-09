import "../../styles/components/navbar.scss";
import GithubIcon from "../icons/github";
import QRCode from "../icons/qrcode";

function NavBar({
  showQRCode,
}: {
  showQRCode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <nav>
        <div id="title">
          <p className="heading">Jobs Scrapper</p>
          <p className="description">Scraps the jobs over the internet</p>
        </div>
        <div id="buttons">
          <div
            id="github"
            onClick={() => {
              window.open("https://github.com/BiltuDas1/Dawn");
            }}
          >
            {<GithubIcon />}
          </div>
          <div
            id="qrcode"
            onClick={() => {
              showQRCode(true);
            }}
          >
            {<QRCode />}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
