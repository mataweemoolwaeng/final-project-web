import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonBack from "../../../../components/buttons/ButtonBack";
import NavbarTop from "../../../../components/navbar/NavbarTop";
import FormEditBuilding from "../formEdit/FormEditBuilding";
import ModalPostLocate from "../../../../components/modal/ModalPostLocate";
import axios from "axios";
import { API } from "../../../../axios/swr/endpoint";
import checkStatus from "../../../../config/checkStatus";
import checkToken from "../../../../config/checkToken";
import configAxios from "../../../../axios/configAxios";
import { GetKanitFont } from "../../../../config/fonts";
import NavbarItem from "../../../../components/navbar/NavbarItem";
function EditBuilding() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [nameTH_Old, setnameTH_Old] = useState<string>(state?.item?.nameTH);
  const [nameEN_Old, setnameEN_Old] = useState<string>(state?.item?.nameEN);
  const [facultyFId_Old, setFacultyFId_Old] = useState<number>(
    state?.item?.facultyFId
  );
  const [faculty_Old, setFaculty_Old] = useState<number>(state?.item?.faculty);
  const [departmentDId_Old, setdepartmentDId_Old] = useState<number>(
    state?.item?.departmentDId
  );
  const [department_Old, setdepartment_Old] = useState<number>(
    state?.item?.department
  );
  const [modalShowCheckBuilding, setModalShowCheckBuilding] = useState(false);
  const [postBuildingCheck, setPostBuildingCheck] = useState<object>();
  const [postBuilding, setPostBuilding] = useState<object>();

  // console.log(state.item);
  const onSubmitFnBuilding = async (status: number) => {
    setModalShowCheckBuilding(false);
    if (status == 1) {
      try {
        const res = await axios(
          configAxios("put", `${API.updateBuilding}${state.id}`, postBuilding)
        );
        checkStatus(res, "แก้ไขสาขาเสร็จสิ้น");
        navigate(-1);
      } catch (error: any) {
        checkToken(error.response.data.status, error.request.status, navigate);
      }
    }
  };
  const clickPage = "setting";
  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={clickPage} />
      <NavbarItem clickPage={clickPage} />
      <div className="d-flex justify-content-center mt-5 mb-2">
        <h3>แก้ไขอาคาร</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {modalShowCheckBuilding && (
        <ModalPostLocate
          onSubmitFnLocate={onSubmitFnBuilding}
          chackDataLocate={postBuildingCheck}
          modalShowCheckLocate={modalShowCheckBuilding}
          isPage={"b"}
          title={"ตึก"}
        />
      )}
      <FormEditBuilding
        nameTH_Old={nameTH_Old}
        nameEN_Old={nameEN_Old}
        facultyFId_Old={facultyFId_Old}
        faculty_Old={faculty_Old}
        departmentDId_Old={departmentDId_Old}
        department_Old={department_Old}
        setModalShowCheckBuilding={setModalShowCheckBuilding}
        setPostBuildingCheck={setPostBuildingCheck}
        setPostBuilding={setPostBuilding}
      />
    </div>
  );
}

export default EditBuilding;
