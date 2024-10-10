import { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Overlay, Popover } from "react-bootstrap";
import Moment from "react-moment";
import colors from "../../../config/colors";
import colorsCate from "../../../config/colorsCate";
import { filterStatus } from "../../../config/filterStatusArr";
import { toLocaleStringEn } from "../../../config/number/formatEN";
import { FiMoreVertical } from "react-icons/fi";
import ModalDeletelType from "../../../components/modal/ModalDeletelType";
import { BiTrash } from "react-icons/bi";
function CardList(props: any) {
  const { listItem, pageShowItem, isShow, setGetTypeItem } = props;
  const navigate = useNavigate();
  const [getVauleNormal, setgetVauleNormal] = useState<any>();
  const [getVauleNotNormal, setgetVauleNotNormal] = useState<any>();
  const [getVaulePendingSale, setgetVaulePendingSale] = useState<any>();
  const [getVauleSoldOut, setgetVauleSoldOut] = useState<any>();
  const [getVauleWaitNumber, setgetVauleWaitNumber] = useState<any>();

  useEffect(() => {
    if (listItem) {
      setgetVauleNormal(filterStatus(listItem, true));
      setgetVauleNotNormal(filterStatus(listItem, false));
      setgetVaulePendingSale(filterStatus(listItem, 2));
      setgetVauleSoldOut(filterStatus(listItem, 3));
      setgetVauleWaitNumber(filterStatus(listItem, 4));
    }
  }, [listItem]);

  //
  const [modalShowDel, setModalShowDel] = useState(false);

  const [itemDel, setitemDel] = useState();

  const loadData = () => {
    setGetTypeItem(undefined);
  };

  return (
    <>
      {modalShowDel && (
        <ModalDeletelType
          show={modalShowDel}
          onHide={() => setModalShowDel(false)}
          isPage={"type"}
          item={itemDel}
          title={"ชนิดครุภัณฑ์"}
          loadData={loadData}
        />
      )}
      <Container>
        <div className="d-flex flex-row justify-content-center flex-wrap bd-highlight mb-3">
          {_.map(listItem, (item, index: any) => {
            // console.log('index = '+index);

            return (
              <Card
                className="m-4 p-1  bd-highlight shadow rounded"
                style={{ width: isShow === "cate" ? "20rem" : "30rem" }}
              >
                {isShow === "cate" && (
                  <>
                    <Card.Header
                      style={{
                        backgroundColor: colorsCate[index],
                        color: "#000",
                      }}
                    >
                      <Card.Title style={{ fontSize: 20, textAlign: "center" }}>
                        {item?.name}
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Subtitle className="mb-2">
                        <Card.Text>
                          หน่วยงาน: {item?.department?.nameTH}
                        </Card.Text>
                      </Card.Subtitle>
                      <Card.Subtitle style={{ height: "3rem" }}></Card.Subtitle>
                      <Card.Subtitle
                        className="mb-1"
                        style={{ textAlign: "end" }}
                      >
                        <Card.Text style={{ textAlign: "end" }}>
                          อยู่ในระบบจำนวน{" "}
                          <span style={{ fontSize: 40 }}>
                            {item?.items?.length}
                          </span>{" "}
                          ชิ้น
                        </Card.Text>
                      </Card.Subtitle>
                      <Card.Subtitle
                        className="mb-1"
                        style={{ textAlign: "end" }}
                      >
                        <span style={{ color: colors.statusColor4 }}>
                          รอหมายเลขครุภัณฑ์
                        </span>{" "}
                        {getVauleWaitNumber == undefined
                          ? ""
                          : getVauleWaitNumber[index]?.length}{" "}
                        ชิ้น {/*  */}
                      </Card.Subtitle>
                      <Card.Subtitle style={{ textAlign: "end" }}>
                        <Card.Text>
                          <span style={{ color: colors.statusColor1 }}>
                            ปกติ
                          </span>{" "}
                          {getVauleNormal == undefined
                            ? ""
                            : getVauleNormal[index]?.length}{" "}
                          ชิ้น /{" "}
                          <span style={{ color: colors.statusColor0 }}>
                            ชำรุด
                          </span>{" "}
                          {getVauleNotNormal == undefined
                            ? ""
                            : getVauleNotNormal[index]?.length}{" "}
                          ชิ้น
                        </Card.Text>
                      </Card.Subtitle>
                      <Card.Subtitle
                        style={{ textAlign: "end" }}
                        className="mt-1"
                      >
                        <Card.Text>
                          <span style={{ color: colors.statusColor2 }}>
                            รอจำหน่าย
                          </span>{" "}
                          {getVaulePendingSale == undefined
                            ? ""
                            : getVaulePendingSale[index]?.length}{" "}
                          ชิ้น /{" "}
                          <span style={{ color: colors.statusColor3 }}>
                            จำหน่ายออก
                          </span>{" "}
                          {getVauleSoldOut == undefined
                            ? ""
                            : getVauleSoldOut[index]?.length}{" "}
                          ชิ้น
                        </Card.Text>
                      </Card.Subtitle>
                    </Card.Body>

                    <Card.Footer className="d-flex flex-row-reverse bd-highligh">
                      <Button
                        variant="warning"
                        onClick={() => {
                          if (isShow === "cate") {
                            localStorage.setItem("pickCateId", item.cate_id);
                            navigate(pageShowItem);
                          } else {
                            // localStorage.setItem("pickTypeId", item.type_id);
                            // navigate(pageShowItem);
                          }
                        }}
                      >
                        ดูรายการครุภัณฑ์
                      </Button>
                    </Card.Footer>
                  </>
                )}
                {isShow === "type" && (
                  <>
                    <Card.Header style={{ backgroundColor: colorsCate[index] }}>
                      <Card.Title style={{ fontSize: 20, textAlign: "center" }}>
                        <div className="d-flex justify-content-between">
                          <div></div>
                          <div>{item?.name}</div>
                          <div></div>
                        </div>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Subtitle className="mb-2">
                        <Card.Text>รหัสครุภัณฑ์: {item?.code}</Card.Text>
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-2">
                        <Card.Text>
                          {" "}
                          จำนวน: {toLocaleStringEn(item?.quantity)} {item?.unit}
                        </Card.Text>
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-2">
                        <Card.Text>
                          ราคา/หน่วย: {toLocaleStringEn(item?.price_unit)}
                        </Card.Text>
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-2">
                        <Card.Text>
                          ราคารวม: {toLocaleStringEn(item?.total_price)}
                        </Card.Text>
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-2">
                        <Card.Text>
                          หน่วยงาน: {item?.department?.nameTH}
                        </Card.Text>
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-2">
                        <Card.Text>หมวดหมู่: {item?.category?.name}</Card.Text>
                      </Card.Subtitle>
                      <Card.Subtitle>
                        <Card.Text>
                          วันที่ซื้อ:{" "}
                          <Moment format="DD/MM/YYYY">
                            {item?.purchase_date}
                          </Moment>
                        </Card.Text>
                      </Card.Subtitle>
                      {/* <Card.Subtitle className=" d-flex justify-content-around">
                        <Card.Text>ปกติ </Card.Text>
                        <Card.Text>ชำรุด </Card.Text>
                      </Card.Subtitle> */}
                      <Card.Subtitle className="mb-1">
                        <Card.Text style={{ textAlign: "end" }}>
                          อยู่ในระบบจำนวน{" "}
                          <span style={{ fontSize: 40 }}>
                            {item?.items?.length}
                          </span>{" "}
                          ชิ้น
                        </Card.Text>
                      </Card.Subtitle>
                      <Card.Subtitle
                        className="mb-1"
                        style={{ textAlign: "end" }}
                      >
                        <span style={{ color: colors.statusColor4 }}>
                          รอหมายเลขครุภัณฑ์
                        </span>{" "}
                        {getVauleWaitNumber == undefined
                          ? ""
                          : getVauleWaitNumber[index]?.length}{" "}
                        ชิ้น {/*  */}
                      </Card.Subtitle>
                      <Card.Subtitle
                        className="mb-2"
                        style={{ textAlign: "end" }}
                      >
                        <Card.Text>
                          <span style={{ color: colors.statusColor1 }}>
                            ปกติ
                          </span>{" "}
                          {getVauleNormal == undefined
                            ? ""
                            : getVauleNormal[index]?.length}{" "}
                          ชิ้น /{" "}
                          <span style={{ color: colors.statusColor0 }}>
                            ชำรุด
                          </span>{" "}
                          {getVauleNotNormal == undefined
                            ? ""
                            : getVauleNotNormal[index]?.length}{" "}
                          ชิ้น {" / "}
                          <span style={{ color: colors.statusColor2 }}>
                            รอจำหน่าย
                          </span>{" "}
                          {getVaulePendingSale == undefined
                            ? ""
                            : getVaulePendingSale[index]?.length}{" "}
                          ชิ้น /{" "}
                          <span style={{ color: colors.statusColor3 }}>
                            จำหน่ายออก
                          </span>{" "}
                          {getVauleSoldOut == undefined
                            ? ""
                            : getVauleSoldOut[index]?.length}{" "}
                          ชิ้น
                        </Card.Text>
                        {/* <Card.Text></Card.Text> */}
                      </Card.Subtitle>
                    </Card.Body>
                    <Card.Footer className="">
                      <div className="d-flex justify-content-between">
                        <div>
                          {item?.items?.length == 0 && (
                            <Button
                              variant="link"
                              style={{ color: colors.black }}
                              onClick={(e: any) => {
                                // console.log(item);
                                setitemDel(item);
                                setModalShowDel(true);
                              }}
                            >
                              <BiTrash size={20} />
                            </Button>
                          )}
                        </div>
                        <div></div>
                        <div>
                          <Button
                            variant="warning"
                            onClick={() => {
                              if (isShow === "type") {
                                localStorage.setItem(
                                  "pickTypeId",
                                  item.type_id
                                );
                                navigate(pageShowItem);
                              } else {
                              }
                            }}
                          >
                            ดูรายการครุภัณฑ์
                          </Button>
                        </div>
                      </div>
                    </Card.Footer>
                  </>
                )}
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default CardList;
