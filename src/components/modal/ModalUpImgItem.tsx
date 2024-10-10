// import React from "react";
import { Button, Modal } from "react-bootstrap";
import { GetKanitFont } from "../../config/fonts";
function ModalUpImgItem(props: any) {
  const {
    onSubmitFnImgItem,
    modalShowCheckUpImgItem,
    title,
    chackImg,
    getItems,
  } = props;
  return (
    <Modal
      style={{ ...GetKanitFont("KanitLight") }}
      show={modalShowCheckUpImgItem}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <div className="d-flex align-items-center justify-content-center">
          <Modal.Title>{title}</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={chackImg.images}
            width={"100%"}
            height={"100%"}
            alt="200x200"
            style={{
              objectFit: "contain",
              borderRadius: 5,
              borderColor: "#ced4da",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            onSubmitFnImgItem(1);
          }}
        >
          ยืนยัน
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onSubmitFnImgItem(0);
          }}
        >
          ยกเลิก
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUpImgItem;
