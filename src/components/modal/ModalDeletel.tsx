import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import colors from "../../config/colors";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { GetKanitFont } from "../../config/fonts";
import configAxios from "../../axios/configAxios";
import checkStatus from "../../config/checkStatus";
import axios from "axios";
import { API } from "../../axios/swr/endpoint";
import { useNavigate } from "react-router-dom";
import { sweet_basic } from "../sweetalert2/sweet";

function ModalDeletel(props: any) {
  const { modalShowDeletel, title, setModal, item, isPage } = props;
  // console.log(title);
  const navigate = useNavigate();
  const [name, setName] = useState<string>();
  return (
    <Modal
      style={{ ...GetKanitFont("KanitLight") }}
      show={modalShowDeletel}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>ลบ{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-2">
          <Form.Label>
            กรุณากรอกชื่อ {title} ให้ตรงกันเพื่อลบ {title}{" "}
            <span style={{ color: colors.blue4C }}>({item.name})</span>
          </Form.Label>
          <Form.Control
            size="lg"
            // readOnly
            type="text"
            placeholder={`ชื่อ${title}`}
            value={name}
            onChange={(event: any) => {
              const value = event.target.value;
              setName(value);
            }}
          />
        </Form.Group>

        <div>
          <IoMdHelpCircleOutline size={15} color={colors.statusColor0} />
          <span
            style={{ color: colors.statusColor0, fontSize: 14 }}
            className="m-1"
          >
            ข้อมูลของ ({item.name}) จะถูกลบทั้งหมด
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={name === item.name ? "success" : "outline-secondary"}
          onClick={async () => {
            if (name === item.name) {
              setModal(false);
              let data = {
                id: item.item_id,
                name: name,
              };
              let api: any;
              if (isPage === "item") {
                api = API.deleteItem;
              }
              try {
                const res = await axios(configAxios("post", api, data));
                checkStatus(res, `ลบ${item.name}เสร็จสิ้น`);
                setModal(false);
                navigate(-1);
              } catch (error: any) {}
            } else {
              sweet_basic(
                "warning",
                "ข้อมูลไม่ตรงกัน",
                `กรุณากรอกข้อมูลชื่อ${title} ให้ตรงกัน`
              );
            }
          }}
        >
          ยืนยัน
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => {
            setModal(false);
          }}
        >
          ยกเลิก
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeletel;
