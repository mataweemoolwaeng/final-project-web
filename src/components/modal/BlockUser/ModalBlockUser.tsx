import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { GetKanitFont } from "../../../config/fonts";
import { IoMdHelpCircleOutline } from "react-icons/io";
import colors from "../../../config/colors";
import { sweet_basic } from "../../sweetalert2/sweet";
import axios from "axios";
import configAxios from "../../../axios/configAxios";
import { API } from "../../../axios/swr/endpoint";
import checkStatus from "../../../config/checkStatus";

function ModalBlockUser(props: any) {
  const { pickUser, fnBlock } = props;
  // console.log(pickUser?.userUserId);
  const [pickStatue, setPickStatue] = useState(-1);
  const [name, setName] = useState<string>();
  // console.log("pickStatue = ", pickStatue);

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
        <Modal.Title id="contained-modal-title-vcenter">
          ระบบผู้ใช้งาน
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-2">
          <Form.Label>
            กรุณากรอกชื่อ ({pickUser?.firstname}){" "}
            ให้ตรงกันเพื่อเปลี่ยนสถานะผู้ใช้งาน (
            <span style={{ color: "red" }}>{pickUser?.firstname}</span>)
          </Form.Label>
          <Form.Control
            size="lg"
            // readOnly
            type="text"
            placeholder={`กรุณากรอกชื่อผู้ใช้งาน`}
            value={name}
            onChange={(event: any) => {
              const value = event.target.value;
              setName(value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Active/Inactive</Form.Label>
          <Form.Select
            size="lg"
            onChange={(event: any) => {
              const value = event.target.value;
              setPickStatue(value);
            }}
          >
            <option value={-1}>เลือกสถานะผู้ใช้งาน</option>
            <option value={1}>Active (ใช้งานอยู่)</option>
            <option value={0}>Inactive (เลิกใช้งานแล้ว)</option>
          </Form.Select>
        </Form.Group>

        {pickStatue == 0 && (
          <div>
            <IoMdHelpCircleOutline size={15} color={colors.statusColor0} />
            <span
              style={{ color: colors.statusColor0, fontSize: 16 }}
              className="m-1"
            >
              เมื่อทำการปิดผู้ใช้งาน (
              {pickUser?.firstname + " " + pickUser?.lastname})
              ผู้ใช้งานจะไม่สามารถเข้าใช้งานระบบได้
            </span>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={
            pickStatue != -1 && name === pickUser?.firstname
              ? "success"
              : "outline-secondary"
          }
          onClick={async () => {
            if (pickStatue != -1 && name === pickUser?.firstname) {
              try {
                let data = {
                  user_id: pickUser?.userUserId,
                  user_status: pickStatue,
                };
                const res = await axios(
                  configAxios("post", API.updateUserBlock, data)
                );
                checkStatus(
                  res,
                  `เปลี่ยนสถานะ ${pickUser?.firstname} เสร็จสิ้น`
                );
                props.onHide();
                fnBlock(1);
              } catch (error: any) {
                checkStatus(error.response.data);
              }
            } else {
              sweet_basic(
                "warning",
                "ข้อมูลไม่ตรงกัน",
                `กรุณากรอกข้อมูลชื่อ${pickUser?.firstname} ให้ตรงกันและเลือกสถานะให้เรียบร้อย`
              );
            }
          }}
        >
          ยืนยัน
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => {
            props.onHide();
          }}
        >
          ยกเลิก
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalBlockUser;
