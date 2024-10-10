import { useState } from "react";
import ButtonBack from "../../../components/buttons/ButtonBack";
import NavbarTop from "../../../components/navbar/NavbarTop";
import { GetKanitFont } from "../../../config/fonts";
import FormAddTypeItem from "../components/FormAddTypeItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configAxios from "../../../axios/configAxios";
import { API } from "../../../axios/swr/endpoint";
import checkStatus from "../../../config/checkStatus";
import checkToken from "../../../config/checkToken";
import ModalPostType from "../../../components/modal/ModalPostType";
import NavbarItem from "../../../components/navbar/NavbarItem";

function NewTypeItem() {
  const navigate = useNavigate();

  const [modalShowCheckType, setModalShowCheckType] = useState(false);
  const [postItemCheckType, setPostItemCheckType] = useState<object>();
  const [postTypeItem, setPostTypeItem] = useState<object>();

  const onSubmitFnType = async (status: number) => {
    setModalShowCheckType(false);
    if (status == 1) {
      try {
        const res = await axios(
          configAxios("post", API.createTypeItem, postTypeItem)
        );
        checkStatus(res, "เพิ่มชนิดครุภัณฑ์เสร็จสิ้น");
      } catch (error: any) {
        checkToken(error.response.data.status, error.request.status, navigate);
      }
    }
  };
  const clickPage = "items";
  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={clickPage} />
      <NavbarItem clickPage={clickPage} />
      <div className="d-flex justify-content-center mt-4 mb-2">
        <h3>เพิ่มชนิดครุภัณฑ์</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {modalShowCheckType && (
        <ModalPostType
          chackDataType={postItemCheckType}
          onSubmitFnType={onSubmitFnType}
          modalShowCheckType={modalShowCheckType}
        />
      )}
      <FormAddTypeItem
        setModalShowCheckType={setModalShowCheckType}
        setPostItemCheckType={setPostItemCheckType}
        setPostTypeItem={setPostTypeItem}
      />
    </div>
  );
}

export default NewTypeItem;
