import { useState, useEffect } from "react";
import { Button, Modal, Form, Figure } from "react-bootstrap";
// import colors from "../../../config/colors";
import { GetKanitFont } from "../../../config/fonts";
// import images from "../../../config/index.images";
import { setURLItem } from "../../../config/setURL_image";
import _ from "lodash";
import {
  chackCodeStatusColor,
  chackStatusItem,
  chackStatusItemColor,
} from "../../../config/chackStatusItem";
import { toLocaleStringEn } from "../../../config/number/formatEN";
import { chackCodeStatusCo } from "../../../config/chackStatusItem";

function ModalDetails(props: any) {
  const { item } = props;
  // console.log(item);
  const [showImage, setShowImage] = useState<any>();
  // console.log(showImage);

  useEffect(() => {
    let itemFilter: any = _.filter(item.img_items, (item: any, index: any) => {
      return index >= 0 && index <= 1;
    });

    setShowImage(itemFilter);
    // console.log(itemFilter);
  }, []);

  const filterMoreImage = () => {
    // console.log(showImage?.length);

    if (showImage?.length == 2) {
      setShowImage(item.img_items);
    } else {
      let itemFilter: any = _.filter(
        item.img_items,
        (item: any, index: any) => {
          return index >= 0 && index <= 1;
        }
      );

      setShowImage(itemFilter);
    }
  };

  const name = item?.name;
  const code = item?.code;
  const status_item: string = item?.status_item;
  const description = item?.description;
  const price = toLocaleStringEn(item?.price);

  // let urlItem: any;
  // if (item?.name_image_item) {
  //   urlItem = setURLItem(item?.name_image_item);
  //   // console.log(urlItem);
  // }

  const category = `${item?.category?.name}`;
  const typeItem = `${item?.typeitem?.name}`;

  const faculty = `${item?.faculty?.nameTH} ${item?.faculty?.nameEN}`;
  const department = `${item?.department?.nameTH} ${item?.department?.nameEN}`;
  const building = `${item?.building?.nameTH} ${item?.building?.nameEN}`;
  const location = `${item?.location?.nameTH} ${item?.location?.nameEN}`;
  const creator = item?.profile?.firstname + " " + item?.profile?.lastname;
  //
  let up_date_statuses: object;
  if (item?.up_date_statuses[0]) {
    up_date_statuses = item?.up_date_statuses[0];
  }

  return (
    <>
      <Modal
        style={{ ...GetKanitFont("KanitLight") }}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        keyboard={false}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            รายละเอียดครุภัณฑ์
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center mt-1 flex-wrap">
            {_.map(showImage, (item) => {
              // console.log(item.name_image_item);
              return (
                <>
                  <Figure>
                    <Figure.Image
                      className="m-1"
                      width={190}
                      height={210}
                      alt="171x180"
                      src={setURLItem(item.name_image_item)}
                    />
                  </Figure>
                </>
              );
            })}
          </div>
          <div className="d-flex justify-content-center">
            <Button
              onClick={() => {
                filterMoreImage();
              }}
              variant="light"
            >
              {showImage?.length == 2 ? "ดูรูปเพิ่มเติม" : "ปิดดูเพิ่มเติม"}
            </Button>
          </div>
          <Form>
            <Form.Group className="mb-2" controlId="formNameItem">
              <Form.Label>ชื่อครุภัณฑ์</Form.Label>
              <Form.Control
                size="lg"
                readOnly
                type="text"
                placeholder="ชื่อ"
                value={name}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>รหัสครุภัณฑ์</Form.Label>
              <Form.Control
                style={{ color: chackCodeStatusColor(code) }}
                size="lg"
                readOnly
                type="text"
                placeholder="Code"
                value={code + chackCodeStatusCo(code)}
              />
            </Form.Group>
            {/*  */}
            <Form.Group className="mb-3" controlId="formStatusItem">
              <Form.Label>สภานะครุภัณฑ์</Form.Label>
              <Form.Control
                style={{
                  color: chackStatusItemColor(status_item),
                }}
                size="lg"
                readOnly
                placeholder="สถานะ"
                type="text"
                value={chackStatusItem(status_item)}
              />
            </Form.Group>
            {/*  */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>รายละเอียดครุภัณฑ์</Form.Label>
              <Form.Control
                size="lg"
                readOnly
                placeholder="สี/ขนาดจอ/ความสูง/ความกว้าง/ยี่ห้อ"
                as="textarea"
                rows={2}
                value={description}
              />
            </Form.Group>
            {/*  */}
            <Form.Group className="mb-3">
              <Form.Label>ราคาครุภัณฑ์</Form.Label>
              <Form.Control
                size="lg"
                readOnly
                type="text"
                placeholder="ราคาครุภัณฑ์"
                value={price}
              />
            </Form.Group>
            {/*  */}
            <Form.Group className="mb-3">
              <Form.Label>หมวดหมู่ครุภัณฑ์</Form.Label>
              <Form.Control
                size="lg"
                readOnly
                type="text"
                placeholder="หมวดหมู่ครุภัณฑ์"
                value={category}
              />
            </Form.Group>
            {/*  */}
            <Form.Group className="mb-3">
              <Form.Label>ชนิดครุภัณฑ์</Form.Label>
              <Form.Control
                size="lg"
                readOnly
                type="text"
                placeholder="ชนิดครุภัณฑ์"
                value={typeItem}
              />
            </Form.Group>
            {/*  */}
            <Form.Group className="mb-3">
              <Form.Label>คณะ</Form.Label>
              <Form.Control
                size="lg"
                readOnly
                type="text"
                placeholder="คณะ"
                value={faculty}
              />
            </Form.Group>
            {/*  */}
            <Form.Group className="mb-3">
              <Form.Label>สาขา</Form.Label>
              <Form.Control
                size="lg"
                readOnly
                type="text"
                placeholder="สาขา"
                value={department}
              />
            </Form.Group>
            {/*  */}
            <Form.Group className="mb-3">
              <Form.Label>อาคาร</Form.Label>
              <Form.Control
                size="lg"
                readOnly
                type="text"
                placeholder="อาคาร"
                value={building}
              />
            </Form.Group>
            {/*  */}
            <Form.Group className="mb-3">
              <Form.Label>สถานที่</Form.Label>
              <Form.Control
                size="lg"
                readOnly
                type="text"
                placeholder="สถานที่"
                value={location}
              />
            </Form.Group>
            {/*  */}
            <Form.Group className="mb-3">
              <Form.Label>Creator</Form.Label>
              <Form.Control
                size="lg"
                readOnly
                type="text"
                placeholder="Creator"
                value={creator}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              {/* <p>การเปลี่ยนสถานล่าสุด</p> */}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>ปิด</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDetails;
