import { Button, Table, Modal } from "react-bootstrap";
import { GetKanitFont } from "../../config/fonts";

function ModalPostCate(props: any) {
  const { modalShowCheckCate, onSubmitFnCate, chackDataCate } = props;
  // console.log(chackDataCate);
  return (
    <Modal
      style={{ ...GetKanitFont("KanitLight") }}
      show={modalShowCheckCate}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>ตรวจสอบหมวดหมู่ครุภัณฑ์</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center ">
          <h4 className="mb-3">กรุณาตรวจสอบหมวดหมู่ครุภัณฑ์</h4>
        </div>
        <div className="d-flex justify-content-center flex-column"></div>
        <Table bordered hover variant="light">
          <thead style={{ ...GetKanitFont("KanitMedium") }}>
            <tr>
              <th>ชนิดช้อมูล</th>
              <th>ข้อมูล</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ชื่อหมวดหมู่ครุภัณฑ์</td>
              <td>{chackDataCate?.name}</td>
            </tr>
            <tr>
              <td>สาขา</td>
              <td>
                {chackDataCate?.department?.nameTH +
                  " " +
                  chackDataCate?.department?.nameEN}
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            onSubmitFnCate(1);
          }}
        >
          ยืนยัน
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onSubmitFnCate(0);
          }}
        >
          ยกเลิก
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPostCate;
