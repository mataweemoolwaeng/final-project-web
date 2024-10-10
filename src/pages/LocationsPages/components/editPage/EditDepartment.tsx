import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonBack from "../../../../components/buttons/ButtonBack";
import NavbarTop from "../../../../components/navbar/NavbarTop";
import { GetKanitFont } from "../../../../config/fonts";
import FormEditDepartment from "../formEdit/FormEditDepartment";
import ModalPostLocate from "../../../../components/modal/ModalPostLocate";
import axios from "axios";
import configAxios from "../../../../axios/configAxios";
import { API } from "../../../../axios/swr/endpoint";
import checkStatus from "../../../../config/checkStatus";
import checkToken from "../../../../config/checkToken";
import NavbarItem from "../../../../components/navbar/NavbarItem";
function EditDepartment() {
  const clickPage = "setting";
  const navigate = useNavigate();
  const { state } = useLocation();
  const [nameTH_Old, setnameTH_Old] = useState<string>(state?.item?.nameTH);
  const [nameEN_Old, setnameEN_Old] = useState<string>(state?.item?.nameEN);
  const [facultyFId_Old, setFacultyFId_Old] = useState<number>(
    state?.item?.facultyFId
  );
  const [faculty_Old, setFaculty_Old] = useState<string>(state?.item?.faculty);

  const [modalShowCheckDepartment, setModalShowCheckDepartment] =
    useState(false);
  const [postDepartmentCheck, setPostDepartmentCheck] = useState<object>();
  const [postDepartment, setPostDepartment] = useState<object>();
  // console.log(state.id);
  // console.log(state.item);

  const onSubmitFnDepartment = async (status: number) => {
    setModalShowCheckDepartment(false);
    if (status == 1) {
      try {
        const res = await axios(
          configAxios(
            "put",
            `${API.updateDepartment}${state.id}`,
            postDepartment
          )
        );
        checkStatus(res, "แก้ไขสาขาเสร็จสิ้น");
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
        <h3>แก้ไขสาขา</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {modalShowCheckDepartment && (
        <ModalPostLocate
          onSubmitFnLocate={onSubmitFnDepartment}
          chackDataLocate={postDepartmentCheck}
          modalShowCheckLocate={modalShowCheckDepartment}
          isPage={"d"}
          title={"สาขา"}
        />
      )}
      <FormEditDepartment
        nameTH_Old={nameTH_Old}
        nameEN_Old={nameEN_Old}
        facultyFId_Old={facultyFId_Old}
        faculty_Old={faculty_Old}
        setModalShowCheckDepartment={setModalShowCheckDepartment}
        setPostDepartmentCheck={setPostDepartmentCheck}
        setPostDepartment={setPostDepartment}
      />
    </div>
  );
}

export default EditDepartment;
