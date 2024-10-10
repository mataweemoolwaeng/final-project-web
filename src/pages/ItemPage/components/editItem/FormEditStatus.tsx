import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import configAxios from "../../../../axios/configAxios";
import { API } from "../../../../axios/swr/endpoint";
import checkToken from "../../../../config/checkToken";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import colors from "../../../../config/colors";
import { sweet_basic } from "../../../../components/sweetalert2/sweet";
import getBase64 from "../../../../config/getBase64";
import images from "../../../../config/index.images";
import {
  chackStatusItem,
  chackStatusItemColor,
} from "../../../../config/chackStatusItem";
function FormEditStatus(props: any) {
  const navigate = useNavigate();
  const {
    getItems,
    setModalShowCheckUpdateItem,
    setPostUpdateItemCheck,
    setPostUpdateItem,
    setuserUrlStatus,
  } = props;
  const [idItem, setIdItem] = useState<any>();
  const [nameItem, setNameItem] = useState<any>();
  const [codeItem, setCodeItem] = useState<any>();

  const [noteItem, setNoteItem] = useState<any>();

  const [statusItem, setStatusItem] = useState<any>(-1);
  const [statusItem_Old, setStatusItem_Old] = useState<any>();

  const [locationLId, setLocationLId] = useState<any>(0);
  const [locationLId_Old, setLocationLId_Old] = useState<any>(0);

  const [getLocation, setGetgetLocation] = useState<string>();

  // console.log("locationLId = " + locationLId);
  // console.log("locationLId_Old = " + locationLId_Old);
  // console.log("noteItem = " + noteItem);
  // console.log("statusItem_Old = " + statusItem_Old);
  // console.log(getItems);

  useEffect(() => {
    setIdItem(getItems?.item_id);
    setNameItem(getItems?.name);
    setCodeItem(getItems?.code);
    setLocationLId(getItems?.locationLId);
    setLocationLId_Old(getItems?.locationLId);
    setStatusItem_Old(getItems?.status_item);

    setSelectedFile(undefined);
    setShowFile(undefined);
  }, [getItems]);

  useMemo(async () => {
    try {
      if (idItem) {
        // console.log("123");
        const res = await axios(configAxios("get", `${API.getLocation}`));
        setGetgetLocation(res.data);
      }
    } catch (error: any) {
      // console.log("err = ", error.request.status);
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, [idItem, getItems]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const obj = {
      itemItemId: idItem,
      name: nameItem,
      code: codeItem,
      location: _.filter(getLocation, (item: any) => {
        return (
          item.l_id ==
          (locationLId != locationLId_Old || locationLId != 0
            ? locationLId
            : locationLId_Old)
        );
      }),

      status: statusItem != -1 ? statusItem : statusItem_Old,
      note: noteItem ? noteItem : "-",
    };
    const data = {
      itemItemId: idItem,
      locationLId:
        locationLId != locationLId_Old || locationLId != 0
          ? locationLId
          : locationLId_Old,
      status: statusItem != -1 ? statusItem : statusItem_Old,
      note: noteItem ? noteItem : "-",
    };
    // console.log("dataform = ", dataform);
    // console.log("obj = ", obj);
    let dataform = new FormData();
    dataform.append("itemItemId", idItem);
    dataform.append(
      "locationLId",
      locationLId != locationLId_Old || locationLId != 0
        ? locationLId
        : locationLId_Old
    );
    dataform.append("status", statusItem != -1 ? statusItem : statusItem_Old);
    dataform.append("note", noteItem ? noteItem : "-");
    dataform.append("images", selectedFile);

    setuserUrlStatus(selectedFile ? true : false);
    setPostUpdateItem(selectedFile ? dataform : data);

    setPostUpdateItemCheck(obj);
    setModalShowCheckUpdateItem(true);
  };

  // Image
  const [selectedFile, setSelectedFile] = useState<any>();
  const [showFile, setShowFile] = useState<any>();
  return (
    <Container>
      <Form>
        <Form.Label style={{ fontSize: 22 }}>
          ย้ายสถานที่หรือเปลี่ยนสถานะครุภัณฑ์
        </Form.Label>

        <Form.Group className="mb-3 mt-3" controlId="formLocation">
          <Form.Label>
            เลือกสถานที่ ตอนนี้อยู่ที่{" "}
            <span style={{ color: "#4c00ff", fontSize: 18 }}>
              (
              {getItems?.location?.nameTH +
                " " +
                getItems?.location?.nameEN +
                " ชั้น" +
                getItems?.location?.floor}
              )
            </span>
          </Form.Label>
          <Form.Select
            style={{
              borderColor:
                locationLId_Old != locationLId && locationLId != 0
                  ? colors.borderColorEdit
                  : "",
            }}
            onChange={(event: any) => {
              const value = event.target.value;
              setLocationLId(value);
            }}
            size="lg"
          >
            <option value={0}>เลือกเปลี่ยนสถานที่</option>

            {_.map(getLocation, (item: any, idx) => {
              return (
                <>
                  <option key={item.l_id} value={item.l_id}>
                    {item.nameTH} {item.nameEN} ชั้น {item.floor}
                  </option>
                </>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Row className="mb-2">
          {/* quantity */}
          <Form.Group as={Col} controlId="formQuantity">
            <Form.Label>หมายเหตุ/Note</Form.Label>
            <Form.Control
              value={noteItem}
              style={{ borderColor: noteItem ? colors.borderColorEdit : "" }}
              onChange={(event: any) => {
                const value = event.target.value;
                setNoteItem(value);
              }}
              size="lg"
              type="text"
              placeholder="หมายเหตุ"
            />
          </Form.Group>
          {/*  */}
          <Form.Group as={Col} controlId="formUnit">
            {/* unit */}
            <Form.Label>
              สถานะครุภัณฑ์ ตอนนี้ (
              <span
                style={{
                  color: chackStatusItemColor(statusItem_Old),
                  fontSize: 18,
                }}
              >
                {chackStatusItem(statusItem_Old)}
              </span>
              )
            </Form.Label>
            <Form.Select
              style={{
                borderColor: statusItem != -1 ? colors.borderColorEdit : "",
              }}
              onChange={(event: any) => {
                const value = event.target.value;
                setStatusItem(value);
              }}
              size="lg"
            >
              <option value="-1">เลือกสถานะ</option>
              <option value="1">ปกติ</option>
              <option value="0">ชำรุด</option>
              <option value="2">รอจำหน่าย</option>
              <option value="3">จำหน่ายออก</option>
              {/* <option value="4">รอหมายเลขครุภัณฑ์</option> */}
            </Form.Select>
          </Form.Group>
        </Row>
        {statusItem == 0 && (
          <>
            <div className="d-flex justify-content-center align-content-center">
              <img
                src={showFile ? showFile : images.upLoadImg}
                className="rounded float-right"
                width={200}
                height={200}
                style={{
                  objectFit: "cover",
                  borderRadius: 15,
                  borderColor: "#ced4da",
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
              />
            </div>
            <div className="d-flex justify-content-center ">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>ภาพประกอบการชำรุด</Form.Label>
                <Form.Control
                  accept="image/png,image/jpeg,image/jpg"
                  placeholder="เลือกรูปภาพ"
                  size="lg"
                  type="file"
                  onChange={(e: any) => {
                    // console.log(e.target.files[0]);
                    getBase64(e.target.files[0], (result: any) => {
                      // console.log(result);
                      setShowFile(result);
                    });

                    setSelectedFile(e.target.files[0]);
                  }}
                />
              </Form.Group>
            </div>
          </>
        )}

        <div className="d-flex justify-content-center">
          <Button
            // style={{}}
            onClick={(event) => {
              if (
                (locationLId_Old != locationLId && locationLId != 0) ||
                statusItem != -1
              ) {
                onSubmit(event);
              } else {
                event.preventDefault();
                sweet_basic("warning", "ข้อมูลไม่ครบ", "กรุณากรอกข้อมูลให้ครบ");
              }
            }}
            className="mb-3 mt-3 p-2"
            variant={
              (locationLId_Old != locationLId && locationLId != 0) ||
              statusItem != -1
                ? "success"
                : "secondary"
            }
            type="submit"
            size="lg"
          >
            {(locationLId_Old != locationLId && locationLId != 0) ||
            statusItem != -1
              ? "บันทึก"
              : "ยังไม่มีข้อมูลที่เปลี่ยนแปลงหรือข้อมูลไม่ครบ"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormEditStatus;
