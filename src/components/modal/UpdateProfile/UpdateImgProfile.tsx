import axios from "axios";
import { useState } from "react";
import { Button, Figure, Form, Modal } from "react-bootstrap";
import configAxios from "../../../axios/configAxios";
import { API } from "../../../axios/swr/endpoint";
import getBase64 from "../../../config/getBase64";
import images from "../../../config/index.images";
import { sweet_basic } from "../../sweetalert2/sweet";
import checkStatus from "../../../config/checkStatus";
import { GetKanitFont } from "../../../config/fonts";
function UpdateImgProfile(props: any) {
  const { getProfile, switchData } = props;
  const [showFile, setShowFile] = useState<any>();
  const [selectedFile, setSelectedFile] = useState<any>();
  // const [showImage, setShowImage] = useState<any>();
  // console.log(getProfile?.pf_id);
  // console.log(selectedFile);

  const upDateImgProfile = async () => {
    try {
      let pf_id = getProfile?.pf_id;
      var data = new FormData();
      data.append("pf_id", pf_id);
      data.append("images", selectedFile);

      const res = await axios(configAxios("post", API.updateUserProfile, data));
      checkStatus(res, `อัปเดตรูปโปรไฟล์เสร็จสิ้น`);
      switchData();
      props.onHide();
    } catch (error: any) {
      checkStatus(error.response.data);
    }
  };
  return (
    <Modal
    style={{ ...GetKanitFont("KanitLight") }}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          อัปเดตรูปโปรไฟล์
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <img
            src={showFile ? showFile : images.upLoadImg}
            className="rounded float-right"
            width={200}
            height={200}
            style={{
              objectFit: "cover",
              borderRadius: 15,
              borderColor: "#ced4da",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          />
        </div>
        <Form.Group controlId="formFile" className="">
          <Form.Label>อัปโหลดรูปภาพ</Form.Label>
          <Form.Control
            // value={}
            accept="image/png,image/jpeg,image/jpg"
            placeholder="เลือกรูปภาพ"
            size="lg"
            type="file"
            onChange={(e: any) => {
              // console.log(e.target.files[0]);
              getBase64(e.target.files[0], (result: any) => {
                // console.log(result);
                setShowFile(result);
              });
              // console.log(e.target.files[0].name);
              setSelectedFile(e.target.files[0]);
            }}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={selectedFile ? "success" : "secondary"}
          onClick={() => {
            if (selectedFile) {
              upDateImgProfile();
            } else {
              sweet_basic(
                "warning",
                "ยังไม่ได้อัปโหลดรูปภาพ",
                `กรุณาอัปโหลดรูปภาพให้เรียบร้อย`
              );
            }
          }}
        >
          บันทึก
        </Button>
        <Button onClick={props.onHide}>ยกเลิก</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateImgProfile;
