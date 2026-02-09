import { QRCodeSVG } from "qrcode.react";
import "../../styles/components/qrcode.scss";
import base32 from "hi-base32";

function QRCodeWindow({
  setQRCodeVisibility,
  qrSecret,
}: {
  setQRCodeVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  qrSecret: string;
}) {
  return (
    <>
      <div
        id="qrcode-background-container"
        onClick={() => {
          setQRCodeVisibility(false);
        }}
      >
        <div id="qrcode-win">
          <div className="qrcode-container">
            <QRCodeSVG
              value={`otpauth://totp/Dawn?secret=${base32.encode(qrSecret)}&issuer=Dawn`}
              size={256}
              fgColor={"#000000"}
              bgColor={"#ffffff"}
              level={"M"}
            />
          </div>
          <p>Scan the QR Code in your authentication software to get TOTP</p>
        </div>
      </div>
    </>
  );
}

export default QRCodeWindow;
