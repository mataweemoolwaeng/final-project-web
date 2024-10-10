import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import configAxios from "../../../../axios/configAxios";
import { API } from "../../../../axios/swr/endpoint";
import ButtonBack from "../../../../components/buttons/ButtonBack";
import NavbarTop from "../../../../components/navbar/NavbarTop";
import checkStatus from "../../../../config/checkStatus";
import checkToken from "../../../../config/checkToken";
import FormInputDepartment from "../formInput/FormInputDepartment";
import ModalPostLocate from "../../../../components/modal/ModalPostLocate";
import { GetKanitFont } from "../../../../config/fonts";
import NavbarItem from "../../../../components/navbar/NavbarItem";

function NewDepartment() {
  const clickPage = "setting";
  const navigate = useNavigate();
  const [modalShowCheckDepartment, setModalShowCheckDepartment] =
    useState(false);
  const [postDepartmentCheck, setPostDepartmentCheck] = useState<object>();
  const [postDepartment, setPostDepartment] = useState<object>();
  //
  const onSubmitFnDepartment = async (status: number) => {
    setModalShowCheckDepartment(false);
    if (status == 1) {
      try {
        const res = await axios(
          configAxios("post", API.createDepartment, postDepartment)
        );
        checkStatus(res, "เพิ่มสาขาเสร็จสิ้น");
      } catch (error: any) {
        checkToken(error.response.data.status, error.request.status, navigate);
      }
    }
  };
  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={clickPage} />
      <NavbarItem clickPage={clickPage} />
      <div className="d-flex justify-content-center mt-4 mb-2">
        <h3>เพิ่มสาขา</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {modalShowCheckDepartment && (
        <ModalPostLocate
          modalShowCheckLocate={modalShowCheckDepartment}
          onSubmitFnLocate={onSubmitFnDepartment}
          chackDataLocate={postDepartmentCheck}
          isPage={"d"}
          title={"สาขา"}
        />
      )}

      {/*  */}
      <FormInputDepartment
        setPostDepartmentCheck={setPostDepartmentCheck}
        setPostDepartment={setPostDepartment}
        setModalShowCheckDepartment={setModalShowCheckDepartment}
      />
    </div>
  );
}

export default NewDepartment;
