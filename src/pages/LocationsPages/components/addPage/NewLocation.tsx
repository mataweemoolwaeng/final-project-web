import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import configAxios from "../../../../axios/configAxios";
import ButtonBack from "../../../../components/buttons/ButtonBack";
import NavbarTop from "../../../../components/navbar/NavbarTop";
import FormInputLocation from "../formInput/FormInputLocation";
import { API } from "../../../../axios/swr/endpoint";
import checkStatus from "../../../../config/checkStatus";
import checkToken from "../../../../config/checkToken";
import ModalPostLocate from "../../../../components/modal/ModalPostLocate";
import { GetKanitFont } from "../../../../config/fonts";
import NavbarItem from "../../../../components/navbar/NavbarItem";

function NewLocation() {
  const navigate = useNavigate();
  const [modalShowCheckLocation, setModalShowCheckLocation] = useState(false);
  const [postLocationCheck, setPostLocationCheck] = useState<object>();
  const [postLocation, setPostLocation] = useState<object>();

  const onSubmitFnLocation = async (status: number) => {
    setModalShowCheckLocation(false);
    if (status == 1) {
      try {
        const res = await axios(
          configAxios("post", API.createLocation, postLocation)
        );
        checkStatus(res, "เพิ่มสถานที่เสร็จสิ้น");
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
      <div className="d-flex justify-content-center mt-4 mb-2">
        <h3>เพิ่มสถานที่</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {/*  */}
      {modalShowCheckLocation && (
        <ModalPostLocate
          modalShowCheckLocate={modalShowCheckLocation}
          onSubmitFnLocate={onSubmitFnLocation}
          chackDataLocate={postLocationCheck}
          isPage={"l"}
          title={"สถานที่"}
        />
      )}

      {/*  */}
      <FormInputLocation
        setModalShowCheckLocation={setModalShowCheckLocation}
        setPostLocationCheck={setPostLocationCheck}
        setPostLocation={setPostLocation}
      />
    </div>
  );
}

export default NewLocation;
