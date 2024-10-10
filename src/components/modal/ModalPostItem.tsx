import { Button, Table, Modal } from "react-bootstrap";
import { GetKanitFont } from "../../config/fonts";
import { toLocaleStringEn } from "../../config/number/formatEN";
function ModalPostItem(props: any) {
  const { modalShowCheck, onSubmitFn, chackData } = props;
  // console.log(chackData);

  return (
    <Modal
      style={{ ...GetKanitFont("KanitLight") }}
      show={modalShowCheck}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>ตรวจสอบครุภัณฑ์</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center ">
          <h4 className="mb-3">กรุณาตรวจสอบครุภัณฑ์</h4>
        </div>
        <div className="d-flex justify-content-center flex-column"></div>
        <Table bordered hover variant="light">
          <thead style={{...GetKanitFont('KanitMedium')}}>
            <tr>
              <th>ชนิดช้อมูล</th>
              <th>ข้อมูล</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ชื่อครุภัณฑ์</td>
              <td>{chackData?.name}</td>
            </tr>
            <tr>
              <td>รหัสครุภัณฑ์</td>
              <td>{chackData?.code}</td>
            </tr>
            <tr>
              <td>สภานะครุภัณฑ์</td>
              <td>{chackData?.status_item?.name}</td>
            </tr>
            <tr>
              <td>รายละเอียดครุภัณฑ์</td>
              <td>{chackData?.description}</td>
            </tr>
            <tr>
              <td>ราคาครุภัณฑ์</td>
              <td>{toLocaleStringEn(chackData?.price)}</td>
            </tr>
            <tr>
              <td>ชนิดครุภัณฑ์</td>
              <td>{chackData?.typeItemType?.typeItem[0]?.name}</td>
            </tr>
            <tr>
              <td>หมวดหมู่ครุภัณฑ์</td>
              <td>{chackData?.typeItemType?.typeItem[0]?.category.name}</td>
            </tr>
            <tr>
              <td>คณะ</td>
              <td>{chackData?.faculty?.faculty[0]?.nameTH}</td>
            </tr>
            <tr>
              <td>สาขา</td>
              <td>{chackData?.department?.department[0]?.nameTH}</td>
            </tr>
            <tr>
              <td>ตึก</td>
              <td>{chackData?.building?.building[0]?.nameTH}</td>
            </tr>
            <tr>
              <td>สถานที่</td>
              <td>{chackData?.location?.location[0]?.nameTH}</td>
            </tr>
            <tr>
              <td>ชั้น</td>
              <td>{chackData?.location?.location[0]?.floor}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            onSubmitFn(1);
          }}
        >
          ยืนยัน
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onSubmitFn(0);
          }}
        >
          ยกเลิก
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPostItem;
