import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import configAxios from "../../../axios/configAxios";
import { API } from "../../../axios/swr/endpoint";
import ButtonBack from "../../../components/buttons/ButtonBack";
import NavbarTop from "../../../components/navbar/NavbarTop";
import checkStatus from "../../../config/checkStatus";
import checkToken from "../../../config/checkToken";
import FormAddUser from "./components/FormAddUser";
import ModalPostUser from "../../../components/modal/ModalPostUser";
import pathRoutesPage from "../../../router/pathPage";
import { GetKanitFont } from "../../../config/fonts";

function NewUser() {
  const navigate = useNavigate();
  const [modalShowCheckUser, setModalShowCheckUser] = useState(false);
  const [postUserCheck, setPostUserCheck] = useState<object>();
  const [postUser, setPostUser] = useState<object>();
  // console.log(postUser);
  const [userUrl, setuserUrl] = useState<boolean>(false);
  // console.log(userUrl);

  const onSubmitFnUser = async (status: number) => {
    setModalShowCheckUser(false);
    let sendUrl = userUrl ? API.createUserPhoto : API.createUser;
    // console.log(sendUrl);
    if (status == 1) {
      try {
        const res = await axios(configAxios("post", sendUrl, postUser));
        checkStatus(res, "เพิ่มผู้ใช้งานเสร็จสิ้น");
      } catch (error: any) {
        checkToken(error.response.data.status, error.request.status, navigate);
      }
    }
  };

  useEffect(() => {
    let userAdmin: any = localStorage.getItem("UserAdmin");
    if (userAdmin !== "true") {
      navigate(pathRoutesPage.Dashboard);
    }
  }, []);
  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={"admin"} />
      <div className="d-flex justify-content-center mt-4 mb-2">
        <h3>สร้างผู้ใช้งาน (สำหรับผู้ดูแลระบบ)</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {modalShowCheckUser && (
        <ModalPostUser
          modalShow={modalShowCheckUser}
          onSubmitFn={onSubmitFnUser}
          chackData={postUserCheck}
          title={"ผู้ใช้งาน"}
          isPage={"u"}
        />
      )}
      <FormAddUser
        setModalShowCheckUser={setModalShowCheckUser}
        setPostUserCheck={setPostUserCheck}
        setPostUser={setPostUser}
        setuserUrl={setuserUrl}
      />
    </div>
  );
}

export default NewUser;
