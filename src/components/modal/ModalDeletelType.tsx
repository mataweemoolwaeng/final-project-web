import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { GetKanitFont } from "../../config/fonts";
import colors from "../../config/colors";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { API } from "../../axios/swr/endpoint";
import axios from "axios";
import configAxios from "../../axios/configAxios";
import checkStatus from "../../config/checkStatus";
import { sweet_basic } from "../sweetalert2/sweet";
import { useNavigate } from "react-router-dom";
function ModalDeletelType(props: any) {
  const navigate = useNavigate();
  const { title, item, isPage, loadData } = props;
  const [name, setName] = useState<string>();
  return (
    <Modal
      style={{ ...GetKanitFont("KanitLight") }}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>ลบ {item?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-2">
          <Form.Label>
            กรุณากรอกชื่อ ({item?.name}) ให้ตรงกันเพื่อลบ{" "}
            <span style={{ color: colors.blue4C }}>({item?.name})</span>
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
            ข้อมูลของ ({item?.name}) จะถูกลบทั้งหมด
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={name === item?.name ? "success" : "outline-secondary"}
          onClick={async () => {
            if (name === item?.name) {
              let data: any;
              let api: any;
              if (isPage === "type") {
                api = API.deleteTypeItem;
                data = {
                  id: item.type_id,
                };
              }
              // console.log(data);

              try {
                const res = await axios(configAxios("post", api, data));
                checkStatus(res, `ลบ${item?.name}เสร็จสิ้น`);
                props.onHide();
                loadData();
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
            props.onHide();
          }}
        >
          ยกเลิก
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeletelType;
