import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Table, Button, Card } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
// import { HiCheck, HiXMark } from "react-icons/hi2";
import colors from "../../config/colors";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { filterStatus } from "../../config/filterStatusArr";
import { GetKanitFont } from "../../config/fonts";
import { toLocaleStringEn } from "../../config/number/formatEN";
import pathRoutesPage from "../../router/pathPage";
function TableListTypeCate(props: any) {
  const { itemList, editPage, isPage } = props;
  const navigate = useNavigate();
  const [getVauleNormal, setgetVauleNormal] = useState<any>();
  const [getVauleNotNormal, setgetVauleNotNormal] = useState<any>();
  const [getVaulePendingSale, setgetVaulePendingSale] = useState<any>();
  const [getVauleSoldOut, setgetVauleSoldOut] = useState<any>();
  const [getVauleWaitNumber, setgetVauleWaitNumber] = useState<any>();

  useEffect(() => {
    if (itemList) {
      setgetVauleNormal(filterStatus(itemList, true));
      setgetVauleNotNormal(filterStatus(itemList, false));
      setgetVaulePendingSale(filterStatus(itemList, 2));
      setgetVauleSoldOut(filterStatus(itemList, 3));
      setgetVauleWaitNumber(filterStatus(itemList, 4));
    }
  }, [itemList]);
  const navigatePage = (page: string, idItem: any, item: any) => {
    navigate(page, { state: { id: idItem, item: item } });
  };

  const [getUserAdmin, setGetUserAdmin] = useState<boolean>(true);
  // const [getProfile, setGetProfile] = useState<any>({});
  // console.log(getProfile);

  useEffect(() => {
    let userAdmin: any = localStorage.getItem("UserAdmin");
    let profile: any = localStorage.getItem("Profile");
    profile = JSON.parse(profile);
    if (userAdmin == "true") {
      setGetUserAdmin(true);
    } else {
      setGetUserAdmin(false);
    }
  }, []);
  return (
    <div style={{ margin: 30 }}>
      <Card
        style={{
          width: "100%",
          // height: 250,
          display: "flex",
          overflow: "auto",
        }}
      >
        <Card.Header>
          <div className="d-flex justify-content-end">
            รายการที่แสดง {itemList.length} รายการทั้งหมด {itemList.length}
          </div>
        </Card.Header>
        <Table
          style={{ paddingTop: 50, textAlign: "center", fontSize: 20 }}
          responsive="sm"
          //striped
          bordered
          hover
        >
          {/*  */}
          <thead style={{ ...GetKanitFont("KanitMedium") }}>
            <tr>
              {isPage === "Type" && (
                <>
                  <th>แก้ไข</th>
                  <th>ลำดับ</th>
                  <th>ชื่อรายการ</th>
                  <th>รหัสครุภัณฑ์</th>
                  <th>จำนวน</th>
                  <th>หน่วยนับ</th>
                  <th>ราคา/หน่วย</th>
                  <th>ราคารวม</th>
                  {getUserAdmin ? (
                    <>
                      <th>หน่วยงาน</th>
                    </>
                  ) : (
                    <></>
                  )}
                  <th>หมวดหมู่</th>
                  <th>อยู่ในระบบ</th>
                  <th style={{ color: colors.statusColor4 }}>รอหมายเลขครุภัณฑ์</th>
                  <th style={{ color: colors.statusColor1 }}>ปกติ</th>
                  <th style={{ color: colors.statusColor0 }}>ชำรุด</th>
                  <th style={{ color: colors.statusColor2 }}>รอจำหน่าย</th>
                  <th style={{ color: colors.statusColor3 }}>จำหน่ายออก</th>
                  <th>วันที่ซื้อ</th>
                </>
              )}
              {isPage === "cate" && (
                <>
                  <th>แก้ไข</th>
                  <th>ลำดับ</th>
                  <th>ชื่อ</th>
                  {getUserAdmin ? (
                    <>
                      <th>หน่วยงาน</th>
                    </>
                  ) : (
                    <></>
                  )}

                  <th>อยู่ในระบบ</th>
                  <th style={{ color: colors.statusColor4 }}>รอหมายเลขครุภัณฑ์</th>
                  <th style={{ color: colors.statusColor1 }}>ปกติ</th>
                  <th style={{ color: colors.statusColor0 }}>ชำรุด</th>
                  <th style={{ color: colors.statusColor2 }}>รอจำหน่าย</th>
                  <th style={{ color: colors.statusColor3 }}>จำหน่ายออก</th>
                </>
              )}
            </tr>
          </thead>
          {/*  */}
          <tbody style={{ fontSize: 18 }}>
            {_.map(itemList, (item, idx: string) => {
              return (
                <tr key={idx}>
                  {isPage === "Type" && (
                    <>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() => {
                            //console.log("item.Type = " + item?.type_id);
                            navigatePage(
                              pathRoutesPage.EditTypeItem,
                              item.type_id,
                              item
                            );
                          }}
                        >
                          <AiFillEdit color={colors.black} size={20} />
                        </Button>
                      </td>
                      <td>{idx + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item?.code}</td>
                      <td>{toLocaleStringEn(item?.quantity)}</td>
                      <td>{item?.unit}</td>
                      <td>{toLocaleStringEn(item?.price_unit)}</td>
                      <td>{toLocaleStringEn(item?.total_price)}</td>
                      {getUserAdmin ? (
                        <>
                          <td>{item?.department?.nameTH}</td>
                        </>
                      ) : (
                        <></>
                      )}
                      <td>{item?.category?.name}</td>
                      <td>{item?.items?.length}</td>
                      <td style={{ color: colors.statusColor4 }}>
                        {getVauleWaitNumber == undefined
                          ? ""
                          : getVauleWaitNumber[idx]?.length}{" "}
                      </td>
                      <td style={{ color: colors.statusColor1 }}>
                        {getVauleNormal == undefined
                          ? ""
                          : getVauleNormal[idx]?.length}{" "}
                      </td>
                      <td style={{ color: colors.statusColor0 }}>
                        {getVauleNotNormal == undefined
                          ? ""
                          : getVauleNotNormal[idx]?.length}
                      </td>
                      <td style={{ color: colors.statusColor2 }}>
                        {getVaulePendingSale == undefined
                          ? ""
                          : getVaulePendingSale[idx]?.length}
                      </td>
                      <td style={{ color: colors.statusColor3 }}>
                        {getVauleSoldOut == undefined
                          ? ""
                          : getVauleSoldOut[idx]?.length}
                      </td>
                      <td>
                        <Moment format="DD/MM/YYYY">
                          {item?.purchase_date}
                        </Moment>
                      </td>
                    </>
                  )}
                  {isPage == "cate" && (
                    <>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() => {
                            //  console.log("item.cate = " + item?.cate_id);
                            navigatePage(
                              pathRoutesPage.EditCategory,
                              item.cate_id,
                              item
                            );
                          }}
                        >
                          <AiFillEdit color={colors.black} size={20} />
                        </Button>
                      </td>
                      <td>{idx + 1}</td>
                      <td>{item.name}</td>
                      {getUserAdmin ? (
                        <>
                          <td>{item?.department?.nameTH}</td>
                        </>
                      ) : (
                        <></>
                      )}

                      <td>{item?.items?.length}</td>
                      <td style={{ color: colors.statusColor4 }}>
                        {getVauleWaitNumber == undefined
                          ? ""
                          : getVauleWaitNumber[idx]?.length}{" "}
                      </td>
                      <td style={{ color: colors.statusColor1 }}>
                        {getVauleNormal == undefined
                          ? ""
                          : getVauleNormal[idx]?.length}{" "}
                      </td>
                      <td style={{ color: colors.statusColor0 }}>
                        {getVauleNotNormal == undefined
                          ? ""
                          : getVauleNotNormal[idx]?.length}
                      </td>
                      <td style={{ color: colors.statusColor2 }}>
                        {getVaulePendingSale == undefined
                          ? ""
                          : getVaulePendingSale[idx]?.length}
                      </td>
                      <td style={{ color: colors.statusColor3 }}>
                        {getVauleSoldOut == undefined
                          ? ""
                          : getVauleSoldOut[idx]?.length}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
          {/*  */}
        </Table>
        <Card.Footer>
          <div className="d-flex justify-content-end">
            {itemList.length} / {itemList.length}
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default TableListTypeCate;
