import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import configAxios from "../../../../axios/configAxios";
import { API } from "../../../../axios/swr/endpoint";
import ButtonBack from "../../../../components/buttons/ButtonBack";
import NavbarTop from "../../../../components/navbar/NavbarTop";
import checkStatus from "../../../../config/checkStatus";
import checkToken from "../../../../config/checkToken";
import FormInputBuilding from "../formInput/FormInputBuilding";
import ModalPostLocate from "../../../../components/modal/ModalPostLocate";
import { GetKanitFont } from "../../../../config/fonts";
import NavbarItem from "../../../../components/navbar/NavbarItem";

function NewBuilding() {
  const clickPage = "setting";
  const navigate = useNavigate();
  const [modalShowCheckBuilding, setModalShowCheckBuilding] = useState(false);
  const [postBuildingCheck, setPostBuildingCheck] = useState<object>();
  const [postBuilding, setPostBuilding] = useState<object>();
  //
  const onSubmitFnBuilding = async (status: number) => {
    setModalShowCheckBuilding(false);
    if (status == 1) {
      try {
        const res = await axios(
          configAxios("post", API.createBuilding, postBuilding)
        );
        checkStatus(res, "เพิ่มอาคารเสร็จสิ้น");
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
        <h3>เพิ่มอาคาร</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {/*  */}
      {modalShowCheckBuilding && (
        <ModalPostLocate
          modalShowCheckLocate={modalShowCheckBuilding}
          onSubmitFnLocate={onSubmitFnBuilding}
          chackDataLocate={postBuildingCheck}
          isPage={"b"}
          title={"อาคาร"}
        />
      )}
      {/*  */}
      <FormInputBuilding
        setModalShowCheckBuilding={setModalShowCheckBuilding}
        setPostBuildingCheck={setPostBuildingCheck}
        setPostBuilding={setPostBuilding}
      />
    </div>
  );
}

export default NewBuilding;
