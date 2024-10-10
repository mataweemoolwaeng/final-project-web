import { Button, Modal, Container, Card, Form } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import { useRef, useEffect, useState } from "react";
import { GetKanitFont } from "../../../config/fonts";
import _ from "lodash";

function ModalSelectQr(props: any) {
  const { idItems, items } = props;

  const [getItem, setGetItem] = useState();
  // console.log(getItem);
  const [sizeQR, SetsizeQR] = useState<number>(120);
  const [sizeFont, SetSizeFont] = useState<number>(11);
  useEffect(() => {
    let itemTrue = _.filter(idItems, (item: any) => {
      return item.click == true;
    });
    // console.log(itemTrue);
    let itemsMap: any = [];
    _.map(itemTrue, (value, key) => {
      // console.log(value);
      // console.log(key);
      let itemFiter = _.filter(items, (item: any) => {
        return item.item_id == value.id;
      });
      itemsMap.push(itemFiter[0]);
      // console.log("itemFiter = ");
    });
    // console.log("itemsMap = ", itemsMap);
    setGetItem(itemsMap);
  }, []);

  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: `Assets Select`,

    // onAfterPrint: () => alert("Print Success"),
  });
  return (
    <Modal
      {...props}
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ ...GetKanitFont("KanitLight") }}
    >
      <Modal.Header closeButton>
        <Container>
          <Modal.Title>QR Code ครุภัณฑ์</Modal.Title>
        </Container>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <div className="d-flex flex-row-reverse bd-highligh">
            <Button size="lg" variant="outline-primary" onClick={handlePrint}>
              สั่งพิมพ์
            </Button>
          </div>
          <div>
            ปรับขนาด QR Code <span>[{sizeQR}]</span>
            <div>
              <Form.Range
                value={sizeQR}
                min="35"
                max="120"
                onChange={(event) => {
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
                onChange={(event) => {
                  // console.log(event.target.value);
                  let range: any = Number(event.target.value);
                  // console.log(range);

                  SetSizeFont(range);
                }}
              />
            </div>
          </div>
        </Container>
        <Container
          style={{ width: 803, height: 1125, backgroundColor: "" }}
          ref={componentRef}
        >
          <div className="d-flex flex-row justify-content-center flex-wrap bd-highlight mb-3">
            {_.map(getItem, (item: any, idx) => {
              return (
                <Card
                  className="m-1 d-flex justify-content-center"
                  // style={{ width: "25%" }}
                  key={idx}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-center flex-column">
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
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={`getItem/${item?.item_id}`}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ModalSelectQr;
