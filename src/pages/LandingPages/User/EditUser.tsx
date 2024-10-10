import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import configAxios from "../../../axios/configAxios";
import { API } from "../../../axios/swr/endpoint";
import ButtonBack from "../../../components/buttons/ButtonBack";
import NavbarTop from "../../../components/navbar/NavbarTop";
import checkStatus from "../../../config/checkStatus";
import checkToken from "../../../config/checkToken";
import { GetKanitFont } from "../../../config/fonts";
import FormEditUser from "./components/FormEditUser";
import ModalPostUser from "../../../components/modal/ModalPostUser";

function EditUser() {
  const { state } = useLocation();
  const navigate = useNavigate();
  // console.log(state);
  const user_Old = state?.item;
  const [modalShowCheckUser, setModalShowCheckUser] = useState(false);
  const [postUserCheck, setPostUserCheck] = useState<object>();
  const [postUser, setPostUser] = useState<object>();

  const [userUrl, setuserUrl] = useState<boolean>(false);

  const onSubmitFnUser = async (status: number) => {
    setModalShowCheckUser(false);
    let sendUrl = userUrl ? API.updateUserPhoto : API.updateUser;
    // console.log(sendUrl);
    if (status == 1) {
      try {
        const res = await axios(
          configAxios("put", `${sendUrl}${state.id}`, postUser)
        );
        checkStatus(res, "แก้ไขผู้ใช้งานเสร็จสิ้น");
        navigate(-1);
      } catch (error: any) {
        checkToken(error.response.data.status, error.request.status, navigate);
      }
    }
  };
  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={"setting"} />
      <div className="d-flex justify-content-center mt-5 mb-2">
        <h3>แก้ไขผู้ใช้งาน</h3>
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
      <FormEditUser
        setModalShowCheckUser={setModalShowCheckUser}
        setPostUserCheck={setPostUserCheck}
        setPostUser={setPostUser}
        user_Old={user_Old}
        setuserUrl={setuserUrl}
      />
    </div>
  );
}

export default EditUser;
