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
import FormEditTypeItem from "../../LocationsPages/components/formEdit/FormEditTypeItem";
import ModalPostType from "../../../components/modal/ModalPostType";
import NavbarItem from "../../../components/navbar/NavbarItem";

function EditTypeItem() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const typeItem_Old = state?.item;
  const [modalShowCheckType, setModalShowCheckType] = useState(false);
  const [postItemCheckType, setPostItemCheckType] = useState<object>();
  const [postTypeItem, setPostTypeItem] = useState<object>();

  const onSubmitFnType = async (status: number) => {
    setModalShowCheckType(false);
    if (status == 1) {
      try {
        const res = await axios(
          configAxios("put", `${API.updateTypeItem}${state.id}`, postTypeItem)
        );
        checkStatus(res, "แก้ไขชนิดครุภัณฑ์เสร็จสิ้น");
        navigate(-1);
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
      <div className="d-flex justify-content-center mt-5 mb-2">
        <h3>แก้ไขชนิดครุภัณฑ์</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {modalShowCheckType && (
        <ModalPostType
          chackDataType={postItemCheckType}
          onSubmitFnType={onSubmitFnType}
          modalShowCheckType={modalShowCheckType}
          isPage={"edit"}
        />
      )}

      <FormEditTypeItem
        setModalShowCheckType={setModalShowCheckType}
        setPostItemCheckType={setPostItemCheckType}
        setPostTypeItem={setPostTypeItem}
        typeItem_Old={typeItem_Old}
      />
    </div>
  );
}

export default EditTypeItem;
