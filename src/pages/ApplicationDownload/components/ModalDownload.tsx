import { Modal, Spinner } from "react-bootstrap";

import Lottie from "react-lottie";
import { GetKanitFont } from "../../../config/fonts";
import jsons from "../../../config/index.jsons";
function ModalDownload(props: any) {
  const { isPage } = props;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: jsons.downloadFile,
    // rendererSettings: {
    //   preserveAspectRatio: "xMidYMid slice",
    // },
  };
  return (
    <Modal
      style={{ ...GetKanitFont("KanitLight") }}
      {...props}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={isPage == "csv" ? "none" : "static"}
      keyboard={false}
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Lottie options={defaultOptions} />
        <Modal.Title style={{ textAlign: "center", marginBottom: 10 }}>
          {isPage === "app" && (
            <>
              <div>ระบบกำลังเตรียมไฟล์ให้ท่านอยู่กรุณารอสักครู่</div>
              <Spinner animation="border" role="status"></Spinner>
              <div>เมื่อเตรียมไฟล์เสร็จหน้าต่างนี้จะปิดอัตโนมัติ</div>
            </>
          )}
          {isPage === "csv" && (
            <>
              กำลังดาวน์โหลด{" "}
              <Spinner animation="border" role="status"></Spinner>
            </>
          )}
        </Modal.Title>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDownload;
