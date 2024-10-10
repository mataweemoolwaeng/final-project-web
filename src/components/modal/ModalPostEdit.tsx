import { Button, Table, Modal } from "react-bootstrap";
// import colors from "../../config/colors";
import {
  chackStatusItem,
  chackStatusItemColor,
} from "../../config/chackStatusItem";
import { GetKanitFont } from "../../config/fonts";
import { toLocaleStringEn } from "../../config/number/formatEN";
function ModalPostEdit(props: any) {
  const {
    modalShowCheckEditItem,
    onSubmitFnEdit,
    chackDataEdit,
    isEdit,
    title,
  } = props;
  // console.log(typeof chackDataEdit?.price);
  // console.log(toLocaleStringEn(chackDataEdit?.price));

  return (
    <Modal
      style={{ ...GetKanitFont("KanitLight") }}
      show={modalShowCheckEditItem}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>ตรวจสอบ{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center ">
          <h4 className="mb-3">กรุณาตรวจสอบ{title}</h4>
        </div>
        <div className="d-flex justify-content-center flex-column"></div>
        <Table bordered hover variant="light">
          <thead>
            <tr style={{ ...GetKanitFont("KanitMedium") }}>
              <th>ชนิดช้อมูล</th>
              <th>ข้อมูล</th>
            </tr>
          </thead>
          <tbody>
            {isEdit == "item" && (
              <>
                <tr>
                  <td>ชื่อ ครุภัณฑ์</td>
                  <td>{chackDataEdit?.name}</td>
                </tr>
                <tr>
                  <td>รหัสครุภัณฑ์</td>
                  <td>{chackDataEdit?.code}</td>
                </tr>
                <tr>
                  <td>รายละเอียดครุภัณฑ์</td>
                  <td>{chackDataEdit?.description}</td>
                </tr>
                <tr>
                  <td>ราคาครุภัณฑ์</td>
                  <td>{toLocaleStringEn(chackDataEdit?.price)}</td>
                </tr>
                <tr>
                  <td>เลือกชนิดครุภัณฑ์</td>
                  <td>{chackDataEdit?.typeItem[0]?.name}</td>
                </tr>
                <tr>
                  <td>หมวดหมู่ครุภัณฑ์</td>
                  <td>{chackDataEdit?.typeItem[0]?.category?.name}</td>
                </tr>
                <tr>
                  <td>คณะ</td>
                  <td>
                    {chackDataEdit?.faculty[0]?.nameTH}{" "}
                    {chackDataEdit?.faculty[0]?.nameEN}
                  </td>
                </tr>
                <tr>
                  <td>สาขา</td>
                  <td>
                    {" "}
                    {chackDataEdit?.department[0]?.nameTH}{" "}
                    {chackDataEdit?.department[0]?.nameEN}
                  </td>
                </tr>
                <tr>
                  <td>อาคาร</td>
                  <td>
                    {chackDataEdit?.building[0]?.nameTH}{" "}
                    {chackDataEdit?.building[0]?.nameEN}
                  </td>
                </tr>
              </>
            )}
            {isEdit == "status" && (
              <>
                <tr>
                  <td>ชื่อ ครุภัณฑ์</td>
                  <td>{chackDataEdit?.name}</td>
                </tr>
                <tr>
                  <td>รหัสครุภัณฑ์</td>
                  <td>{chackDataEdit?.code}</td>
                </tr>
                <tr>
                  <td>สถานที่</td>
                  <td>
                    {chackDataEdit?.location[0].nameTH}{" "}
                    {chackDataEdit?.location[0].nameEN} {"ชั้น"}
                    {chackDataEdit?.location[0].floor}
                  </td>
                </tr>
                <tr>
                  <td>สถานนะ</td>
                  <td>
                    <span
                      style={{
                        color: chackStatusItemColor(chackDataEdit?.status),
                        fontSize: 18,
                      }}
                    >
                      {chackStatusItem(chackDataEdit?.status)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>หมายเหตุ/Note</td>
                  <td>{chackDataEdit?.note}</td>
                </tr>
              </>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            onSubmitFnEdit(1);
          }}
        >
          ยืนยัน
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onSubmitFnEdit(0);
          }}
        >
          ยกเลิก
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPostEdit;
