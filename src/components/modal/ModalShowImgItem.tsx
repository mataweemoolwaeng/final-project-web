// import React from 'react'
import { useState, useRef } from "react";
import { Button, Modal, Overlay, Popover } from "react-bootstrap";
import { GetKanitFont } from "../../config/fonts";
import { setURLItem } from "../../config/setURL_image";
import { BiTrash } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import axios from "axios";
import configAxios from "../../axios/configAxios";
import { API } from "../../axios/swr/endpoint";
import checkStatus from "../../config/checkStatus";
import checkToken from "../../config/checkToken";

function ModalShowImgItem(props: any) {
  const { title, showImg } = props;

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const [cilckDle, setCilckDle] = useState(false);

  const delImgItem = async () => {
    let postImgImgItem = {
      name_image_item: showImg?.name_image_item,
    };
    try {
      const res = await axios(
        configAxios("post", API.deleteImgItems, postImgImgItem)
      );
      checkStatus(res, "ลบรูปครุภัณฑ์เสร็จสิ้น");
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status);
    }
  };

  const handleClick = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };
  return (
    <Modal
      style={{ ...GetKanitFont("KanitLight") }}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <div className="d-flex align-items-center justify-content-center">
          <Modal.Title>{title}</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div ref={ref}>
          <div className="d-flex justify-content-end mb-2">
            {cilckDle && (
              <>
                <Button
                  style={{ fontSize: 14 }}
                  variant="outline-danger"
                  className="m-1"
                  onClick={async () => {
                    await delImgItem();
                    props.onHide(1);
                  }}
                >
                  ยืนยันลบ
                </Button>
                <Button
                  style={{ fontSize: 14 }}
                  variant="outline-dark"
                  className="m-1"
                  onClick={() => {
                    setCilckDle(false);
                  }}
                >
                  ยกเลิก
                </Button>
              </>
            )}
            <Button variant="light" onClick={handleClick}>
              <FiMoreVertical size={20} />
            </Button>
          </div>
          {/*  */}
         <Overlay
            show={show}
            target={target}
            placement="bottom"
            container={ref}
            containerPadding={30}
          >
            <Popover id="popover-contained">
              <Popover.Body>
                <Button
                  variant="light"
                  onClick={() => {
                    setCilckDle(true);
                    setShow(!show);
                  }}
                >
                  <div className="d-flex">
                    <div className="d-flex justify-content-center align-content-center">
                      <BiTrash size={20} />
                      <span>ลบรูปครุภัณฑ์</span>
                    </div>
                    <div className=" d-flex justify-content-center align-content-center"></div>
                  </div>
                </Button>
              </Popover.Body>
            </Popover>
          </Overlay> 
          {/*  */}
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={setURLItem(showImg?.name_image_item)}
            width={"100%"}
            height={"100%"}
            // alt="500x500"
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
        <Button variant="outline-primary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalShowImgItem;
