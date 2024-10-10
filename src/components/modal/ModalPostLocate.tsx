import { Button, Table, Modal } from "react-bootstrap";
import { GetKanitFont } from "../../config/fonts";

function ModalPostLocate(props: any) {
  const {
    modalShowCheckLocate,
    onSubmitFnLocate,
    chackDataLocate,
    isPage,
    title,
  } = props;
  // console.log(chackDataLocate);

  return (
    <Modal
      style={{ ...GetKanitFont("KanitLight") }}
      show={modalShowCheckLocate}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>ตรวจสอบ{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center ">
          <h4 className="mb-3">กรุณาตรวจ{title}</h4>
        </div>
        <div className="d-flex justify-content-center flex-column"></div>
        <Table bordered hover variant="light">
          <thead>
            <tr>
              <th>ชนิดช้อมูล</th>
              <th>ข้อมูล</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ชื่อ{title} (ไทย)</td>
              <td>{chackDataLocate?.nameTH}</td>
            </tr>
            <tr>
              <td>ชื่อ{title} (อังกฤษ)</td>
              <td>{chackDataLocate?.nameEN}</td>
            </tr>
            {isPage == "l" && (
              <tr>
                <td>ชั้นที่ </td>
                <td>{chackDataLocate?.floor}</td>
              </tr>
            )}

            {isPage == "d" || isPage == "b" || isPage == "l" ? (
              <tr>
                <td>ชื่อคณะ</td>
                <td>
                  {chackDataLocate?.faculty[0]?.nameTH}{" "}
                  {chackDataLocate?.faculty[0]?.nameEN}
                </td>
              </tr>
            ) : (
              <></>
            )}
            {isPage == "b" || isPage == "l" ? (
              <tr>
                <td>ชื่อสาขา</td>
                <td>
                  {chackDataLocate?.department[0]?.nameTH}{" "}
                  {chackDataLocate?.department[0]?.nameEN}
                </td>
              </tr>
            ) : (
              <></>
            )}
            {isPage == "l" ? (
              <tr>
                <td>ชื่ออาคาร</td>
                <td>
                  {chackDataLocate?.building[0]?.nameTH}{" "}
                  {chackDataLocate?.building[0]?.nameEN}
                </td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            onSubmitFnLocate(1);
          }}
        >
          ยืนยัน
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onSubmitFnLocate(0);
          }}
        >
          ยกเลิก
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPostLocate;
