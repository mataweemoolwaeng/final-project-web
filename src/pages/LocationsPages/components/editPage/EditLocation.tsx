import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import configAxios from "../../../../axios/configAxios";
import { API } from "../../../../axios/swr/endpoint";
import ButtonBack from "../../../../components/buttons/ButtonBack";
import NavbarTop from "../../../../components/navbar/NavbarTop";
import checkStatus from "../../../../config/checkStatus";
import checkToken from "../../../../config/checkToken";
import FormEditLocation from "../formEdit/FormEditLocation";
import ModalPostLocate from "../../../../components/modal/ModalPostLocate";
import { GetKanitFont } from "../../../../config/fonts";
import NavbarItem from "../../../../components/navbar/NavbarItem";

function EditLocation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  // console.log(state.id);

  const [nameTH_Old, setnameTH_Old] = useState<string>(state?.item?.nameTH);
  const [nameEN_Old, setnameEN_Old] = useState<string>(state?.item?.nameEN);

  const [floor_Old, setFloor_Old] = useState<string>(state?.item?.floor);
  const [facultyFId_Old, setFacultyFId_Old] = useState<number>(
    state?.item?.facultyFId
  );
  const [faculty_Old, setFaculty_Old] = useState<{}>(state?.item?.faculty);
  const [departmentDId_Old, setdepartmentDId_Old] = useState<number>(
    state?.item?.departmentDId
  );
  const [department_Old, setdepartment_Old] = useState<{}>(
    state?.item?.department
  );
  const [buildingBId_Old, setbuildingBId_Old] = useState<number>(
    state?.item?.buildingBId
  );
  const [building_Old, setbuilding_Old] = useState<{}>(state?.item?.building);
  const [modalShowCheckLocation, setModalShowCheckLocation] = useState(false);
  const [postLocationCheck, setPostLocationCheck] = useState<object>();
  const [postLocation, setPostLocation] = useState<object>();

  const onSubmitFnLocation = async (status: number) => {
    setModalShowCheckLocation(false);
    if (status == 1) {
      try {
        const res = await axios(
          configAxios("put", `${API.updateLocation}${state.id}`, postLocation)
        );
        checkStatus(res, "แก้ไขสถานที่สร็จสิ้น");
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
        <h3>แก้ไขสถานที่</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {modalShowCheckLocation && (
        <ModalPostLocate
          onSubmitFnLocate={onSubmitFnLocation}
          chackDataLocate={postLocationCheck}
          modalShowCheckLocate={modalShowCheckLocation}
          isPage={"l"}
          title={"สถานที่"}
        />
      )}
      <FormEditLocation
        nameTH_Old={nameTH_Old}
        nameEN_Old={nameEN_Old}
        floor_Old={floor_Old}
        facultyFId_Old={facultyFId_Old}
        faculty_Old={faculty_Old}
        departmentDId_Old={departmentDId_Old}
        department_Old={department_Old}
        buildingBId_Old={buildingBId_Old}
        building_Old={building_Old}
        setModalShowCheckLocation={setModalShowCheckLocation}
        setPostLocationCheck={setPostLocationCheck}
        setPostLocation={setPostLocation}
      />
    </div>
  );
}

export default EditLocation;
