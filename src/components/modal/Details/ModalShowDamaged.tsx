import axios from "axios";
import React, { useRef, useState } from "react";

import { Button, Modal, Overlay, Popover } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import configAxios from "../../../axios/configAxios";
import { API } from "../../../axios/swr/endpoint";
import checkStatus from "../../../config/checkStatus";
import checkToken from "../../../config/checkToken";
import { GetKanitFont } from "../../../config/fonts";
import images from "../../../config/index.images";
import { setURLItemDamaged } from "../../../config/setURL_image";

function ModalShowDamaged(props: any) {
  const { name_image_damaged, fnDelImg } = props;
  // console.log(name_image_damaged);

  let urlProfile;
  if (name_image_damaged) {
    urlProfile = setURLItemDamaged(name_image_damaged);
    // console.log(urlProfile);
  }
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const [cilckDle, setCilckDle] = useState(false);
  const handleClick = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };

  const delImgItem = async () => {
    let postImgImgItem = {
      name_image_item_damaged: name_image_damaged,
    };
    try {
      const res = await axios(
        configAxios("post", API.deleteImgItemsDamaged, postImgImgItem)
      );
      checkStatus(res, "ลบรูปครุภัณฑ์เสร็จสิ้นชำรุด");
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status);
    }
  };
  return (
    <>
      <Modal
        style={{ ...GetKanitFont("KanitLight") }}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            รูปภาพประกอบการชำรุด
          </Modal.Title>
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
                      fnDelImg();
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
                        <span>ลบรูปครุภัณฑ์ชำรุด</span>
                      </div>
                      <div className=" d-flex justify-content-center align-content-center"></div>
                    </div>
                  </Button>
                </Popover.Body>
              </Popover>
            </Overlay>
            {/*  */}
          </div>
          {/*  */}
          <div className="d-flex justify-content-center mt-3">
            <img
              src={urlProfile ? urlProfile : images.imageNotFound}
              className="rounded float-right"
              width={300}
              height={300}
              style={{
                objectFit: "cover",
                borderRadius: 15,
                borderColor: "#ced4da",
                borderWidth: 1,
                borderStyle: "solid",
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalShowDamaged;
