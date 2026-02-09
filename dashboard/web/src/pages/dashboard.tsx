import { useState } from "react";
import List from "../components/ui/list";
import NavBar from "../components/ui/navbar";
import Tools from "../components/ui/tools";
import type { JobsDataResponse } from "../types/jobs";
import QRCodeWindow from "../components/ui/qrcode";

function Dashboard({ data }: { data: JobsDataResponse }) {
  const [isQRVisible, showQRCode] = useState(false);

  return (
    <>
      <NavBar showQRCode={showQRCode} />
      <Tools />
      <List data={data} />
      {isQRVisible && data.result && (
        <QRCodeWindow setQRCodeVisibility={showQRCode} qrSecret={data.secret} />
      )}
    </>
  );
}

export default Dashboard;
