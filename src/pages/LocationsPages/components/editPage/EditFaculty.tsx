import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonBack from "../../../../components/buttons/ButtonBack";
import NavbarTop from "../../../../components/navbar/NavbarTop";
import { GetKanitFont } from "../../../../config/fonts";
import FormEditFaculty from "../formEdit/FormEditFaculty";
import ModalPostLocate from "../../../../components/modal/ModalPostLocate";
import axios from "axios";
import configAxios from "../../../../axios/configAxios";
import { API } from "../../../../axios/swr/endpoint";
import checkStatus from "../../../../config/checkStatus";
import checkToken from "../../../../config/checkToken";
import NavbarItem from "../../../../components/navbar/NavbarItem";
function EditFaculty() {
  const clickPage = "setting";
  const navigate = useNavigate();
  const { state } = useLocation();
  // const [getFaculty, setGetFaculty] = useState<{}>(state?.item);
  const [nameTH_Old, setnameTH_Old] = useState<string>(state?.item?.nameTH);
  const [nameEN_Old, setnameEN_Old] = useState<string>(state?.item?.nameEN);

  const [modalShowCheckFaculty, setModalShowCheckFaculty] = useState(false);

  const [postFacultyCheck, setPostFacultyCheck] = useState<object>();
  const onSubmitFnFaculty = async (status: number) => {
    setModalShowCheckFaculty(false);
    if (status == 1) {
      try {
        const res = await axios(
          configAxios(
            "put",
            `${API.updateFaculty}${state.id}`,
            postFacultyCheck
          )
        );
        checkStatus(res, "แก้ไขคณะเสร็จสิ้น");
        navigate(-1);
      } catch (error: any) {
        checkToken(error.response.data.status, error.request.status, navigate);
      }
    }
  };

  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={clickPage} />
      <NavbarItem clickPage={clickPage} />
      <div className="d-flex justify-content-center mt-5 mb-2">
        <h3>แก้ไขคณะ</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {modalShowCheckFaculty && (
        <ModalPostLocate
          onSubmitFnLocate={onSubmitFnFaculty}
          chackDataLocate={postFacultyCheck}
          modalShowCheckLocate={modalShowCheckFaculty}
          isPage={"f"}
          title={"คณะ"}
        />
      )}
      <FormEditFaculty
        nameTH_Old={nameTH_Old}
        nameEN_Old={nameEN_Old}
        setModalShowCheckFaculty={setModalShowCheckFaculty}
        setPostFacultyCheck={setPostFacultyCheck}
      />
    </div>
  );
}

export default EditFaculty;
