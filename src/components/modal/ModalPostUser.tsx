import { Button, Table, Modal } from "react-bootstrap";
import { GetKanitFont } from "../../config/fonts";

function ModalPostUser(props: any) {
  const { modalShow, onSubmitFn, chackData, title, isPage } = props;
  // console.log(chackData);

  return (
    <Modal
      style={{ ...GetKanitFont("KanitLight") }}
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>ตรวจสอบข้อมูล{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center ">
          <h4 className="mb-3">กรุณาตรวจสอบข้อมูล{title}</h4>
        </div>
        <div className="d-flex justify-content-center flex-column"></div>
        <Table bordered hover variant="light">
          <thead>
            <tr>
              <th>ชนิดช้อมูล</th>
              <th>ข้อมูล</th>
            </tr>
          </thead>
          {isPage == "u" && (
            <tbody>
              <tr>
                <td>Username</td>
                <td>{chackData?.username}</td>
              </tr>
              <tr>
                <td>Firstname</td>
                <td>{chackData?.firstname}</td>
              </tr>
              <tr>
                <td>Lastname</td>
                <td>{chackData?.lastname}</td>
              </tr>
              <tr>
                <td>Nickname</td>
                <td>{chackData?.nickname}</td>
              </tr>
              <tr>
                <td>Telephone</td>
                <td>{chackData?.telephone}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{chackData?.email}</td>
              </tr>
              <tr>
                <td>Admin</td>
                <td>{chackData?.admin ? "Admin" : "User"}</td>
              </tr>
              <tr>
                <td>คณะ</td>
                <td>{chackData?.faculty[0]?.nameTH}</td>
              </tr>
              <tr>
                <td>สาขา</td>
                <td>{chackData?.department[0]?.nameTH}</td>
              </tr>
            </tbody>
          )}
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

export default ModalPostUser;
