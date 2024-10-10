import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Table, Button, OverlayTrigger, Tooltip, Card } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { HiCheck, HiXMark } from "react-icons/hi2";
import colors from "../../config/colors";
import { useState } from "react";
import ModalBlockUser from "../modal/BlockUser/ModalBlockUser";
import { CiImageOn } from "react-icons/ci";
import ModalShowImgProfile from "../modal/UpdateProfile/ModalShowImgProfile";
import { GetKanitFont } from "../../config/fonts";
import pathRoutesPage from "../../router/pathPage";
function TableListUsers(props: any) {
  const { itemList, editPage, setResetUsers, resetUsers } = props;
  const [modalShowImgProfile, setModalShowImgProfile] = useState(false);
  const [pickProfile, setPickProfile] = useState();

  const navigate = useNavigate();

  const navigatePage = (page: string, idItem: any, item: any) => {
    navigate(page, { state: { id: idItem, item: item } });
  };
  // console.log(itemList);

  const [modalShowBlockUser, setModalShowBlockUser] = useState(false);
  const [pickUser, setPickUser] = useState({});

  const fnBlock = (status: number) => {
    if (status == 1) {
      setResetUsers(!resetUsers);
    }
  };
  return (
    <div style={{ margin: 30 }}>
      {modalShowBlockUser && (
        <ModalBlockUser
          fnBlock={fnBlock}
          pickUser={pickUser}
          show={modalShowBlockUser}
          onHide={() => setModalShowBlockUser(false)}
        />
      )}
      {modalShowImgProfile && (
        <ModalShowImgProfile
          getProfile={pickProfile}
          show={modalShowImgProfile}
          onHide={() => setModalShowImgProfile(false)}
        />
      )}
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
          style={{ paddingTop: 50, textAlign: "center", fontSize: 22 }}
          responsive="sm"
          //striped
          bordered
          hover
        >
          {/*  */}
          <thead style={{ ...GetKanitFont("KanitMedium") }}>
            <tr>
              <th>แก้ไข</th>
              <th>รูปโปรไฟล์</th>
              <th>คณะ</th>
              <th>สาขา</th>
              <th>รหัส</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>ชื่อเล่น</th>
              <th>อีเมล</th>
              <th>เบอร์โทร</th>
              <th>Active</th>
              <th>Admin</th>
            </tr>
          </thead>
          {/*  */}
          <tbody>
            {_.map(itemList, (item, idx: string) => {
              return (
                <tr key={idx}>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => {
                        //console.log("item.item_id = " + item?.userUserId);
                        navigatePage(
                          pathRoutesPage.EditUser,
                          item?.userUserId,
                          item
                        );
                      }}
                    >
                      <AiFillEdit color={colors.black} size={20} />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-dark"
                      onClick={() => {
                        setPickProfile(item);
                        setModalShowImgProfile(true);
                        // console.log("item.item_id = ", item);
                      }}
                    >
                      <CiImageOn color={colors.black} size={20} />
                    </Button>
                  </td>
                  <td>{item?.faculty?.nameTH}</td>
                  <td>{item?.department?.nameTH}</td>
                  <td>{item?.user?.username}</td>
                  <td>{item?.firstname}</td>
                  <td>{item?.lastname}</td>
                  <td>{item?.nickname}</td>
                  <td>{item?.email}</td>
                  <td>{item?.telephone}</td>
                  <td>
                    <>
                      {item?.user?.admin ? (
                        <>
                          <span
                            style={{
                              color: item?.user?.user_status
                                ? colors.statusColor1
                                : colors.statusColor0,
                            }}
                          >
                            {item?.user?.user_status ? "active" : "inactive"}
                          </span>
                        </>
                      ) : (
                        <div className="d-flex justify-content-center">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-disabled">
                                {item?.user?.user_status
                                  ? "ปิดใช้ผู้ ใช้งาน"
                                  : "เปิดใช้ ผู้ใช้งาน"}
                              </Tooltip>
                            }
                          >
                            <td>
                              <Button
                                onClick={() => {
                                  setModalShowBlockUser(true);
                                  setPickUser(item);
                                }}
                                style={{ width: "5rem" }}
                                variant="outline-warning"
                              >
                                <span
                                  style={{
                                    color: item?.user?.user_status
                                      ? colors.statusColor1
                                      : colors.statusColor0,
                                  }}
                                >
                                  {item?.user?.user_status
                                    ? "active"
                                    : "inactive"}
                                </span>
                              </Button>
                            </td>
                          </OverlayTrigger>
                        </div>
                      )}
                    </>
                  </td>
                  <td
                    style={{
                      color: item?.user?.admin
                        ? colors.statusColor1
                        : colors.statusColor0,
                    }}
                  >
                    {item?.user?.admin ? <HiCheck /> : <HiXMark />}
                  </td>
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

export default TableListUsers;
