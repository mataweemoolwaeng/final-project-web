import { Button, Modal, Card, Container, Form } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";
import { GetKanitFont } from "../../../config/fonts";

function ModalOneQr(props: any) {
  const { item } = props;
  // console.log(item);
  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: `Assets ${item?.code}`,
    // onAfterPrint: () => alert("Print Success"),
  });
  const [sizeQR, SetsizeQR] = useState<number>(120);
  const [sizeFont, SetSizeFont] = useState<number>(11);

  const urlQr = `getItem/${item?.item_id}`;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ ...GetKanitFont("KanitLight") }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Qr Code {item?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <div>
            ปรับขนาด QR Code <span>[{sizeQR}]</span>
            <div>
              <Form.Range
                value={sizeQR}
                min="35"
                max="120"
                onChange={(event: any) => {
                  // console.log(event.target.value);
                  let range: any = Number(event.target.value);
                  // console.log(range);

                  SetsizeQR(range);
                }}
              />
            </div>
          </div>
          <div>
            ปรับขนาด รหัสครุภัณฑ์ <span>[{sizeFont}]</span>
            <div>
              <Form.Range
                value={sizeFont}
                min="6"
                max="20"
                onChange={(event: any) => {
                  // console.log(event.target.value);
                  let range: any = Number(event.target.value);
                  // console.log(range);

                  SetSizeFont(range);
                }}
              />
            </div>
          </div>
        </Container>
        {/*  */}
        <Container
          className="d-flex justify-content-center "
          ref={componentRef}
        >
          <Card
            className="m-4 bd-highlight "
            // style={{ width: "25%" }}
          >
            <Card.Body>
              <div>
                <div className="d-flex justify-content-center ">
                  <span style={{ fontSize: sizeFont, textAlign: "center" }}>
                    {item?.code}
                  </span>
                </div>
                <div
                  style={{
                    borderWidth: 1,
                    // backgroundColor: "#fdf",
                    height: "auto",
                    margin: "0 auto",
                    maxWidth: sizeQR,
                    width: "100%",
                    // marginBottom: 30,
                  }}
                >
                  <QRCode
                    size={230}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={urlQr}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
        <div className="d-flex justify-content-center ">
          <Button variant="outline-primary" onClick={handlePrint}>
            สั่งพิมพ์
          </Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalOneQr;
