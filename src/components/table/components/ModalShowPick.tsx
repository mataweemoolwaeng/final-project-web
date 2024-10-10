import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GetKanitFont } from "../../../config/fonts";
import pathRoutesPage from "../../../router/pathPage";

function ModalShowPick(props: any) {
  const { pickItem } = props;
  const navigate = useNavigate();
  //
  const navigatePage = (idItem?: any) => {
    navigate(pathRoutesPage.EditItem, {
      state: { id: idItem, isPage: "items" },
    });
  };
  return (
    <Modal
      style={{ ...GetKanitFont("KanitLight") }}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          แก้ไข {pickItem?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column">
          <Button
            className="mb-1"
            style={{ textAlign: "center" }}
            size="lg"
            variant="outline-primary"
            onClick={() => {
              props.onHide();
              localStorage.setItem("itemItemEditIs", "image");
              navigatePage();
            }}
          >
            แก้ไขรูปครุภัณฑ์
          </Button>
          <Button
            className="mb-1"
            style={{ textAlign: "center" }}
            size="lg"
            variant="outline-warning"
            onClick={() => {
              props.onHide();

              localStorage.setItem("itemItemEditIs", "details");
              navigatePage();
            }}
          >
            แก้ไขรายละเอียดครุภัณฑ์
          </Button>
          <Button
            className="mb-1"
            style={{ textAlign: "center" }}
            size="lg"
            variant="outline-success"
            onClick={() => {
              props.onHide();

              localStorage.setItem("itemItemEditIs", "status");
              navigatePage();
            }}
          >
            แก้ไขสถานะครุภัณฑ์
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>
          ปิด
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalShowPick;
