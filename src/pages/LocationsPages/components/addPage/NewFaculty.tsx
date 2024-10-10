import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import configAxios from "../../../../axios/configAxios";
import { API } from "../../../../axios/swr/endpoint";
import ButtonBack from "../../../../components/buttons/ButtonBack";
import NavbarTop from "../../../../components/navbar/NavbarTop";
import checkStatus from "../../../../config/checkStatus";
import checkToken from "../../../../config/checkToken";
import FormInputFaculty from "../formInput/FormInputFaculty";
import ModalPostLocate from "../../../../components/modal/ModalPostLocate";
import { GetKanitFont } from "../../../../config/fonts";
import NavbarItem from "../../../../components/navbar/NavbarItem";

function NewFaculty() {
  const clickPage = "setting";
  const navigate = useNavigate();
  const [modalShowCheckFaculty, setModalShowCheckFaculty] = useState(false);
  const [postFacultyCheck, setPostFacultyCheck] = useState<object>();

  const onSubmitFnFaculty = async (status: number) => {
    setModalShowCheckFaculty(false);
    if (status == 1) {
      try {
        const res = await axios(
          configAxios("post", API.createFaculty, postFacultyCheck)
        );
        checkStatus(res, "เพิ่มคณะเสร็จสิ้น");
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
        <h3>เพิ่มคณะ</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {/*  */}
      {modalShowCheckFaculty && (
        <ModalPostLocate
          onSubmitFnLocate={onSubmitFnFaculty}
          chackDataLocate={postFacultyCheck}
          modalShowCheckLocate={modalShowCheckFaculty}
          isPage={"f"}
          title={"คณะ"}
        />
      )}
      {/*  */}
      <FormInputFaculty
        setModalShowCheckFaculty={setModalShowCheckFaculty}
        setPostFacultyCheck={setPostFacultyCheck}
      />
    </div>
  );
}

export default NewFaculty;
