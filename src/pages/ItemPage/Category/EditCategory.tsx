import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonBack from "../../../components/buttons/ButtonBack";
import NavbarTop from "../../../components/navbar/NavbarTop";
import { GetKanitFont } from "../../../config/fonts";
import ModalPostCate from "../../../components/modal/ModalPostCate";
import FormEditCategory from "../../LocationsPages/components/formEdit/FormEditCategory";
import axios from "axios";
import configAxios from "../../../axios/configAxios";
import { API } from "../../../axios/swr/endpoint";
import checkStatus from "../../../config/checkStatus";
import checkToken from "../../../config/checkToken";
import NavbarItem from "../../../components/navbar/NavbarItem";
function EditCategory() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name_Old, setname_Old] = useState<string>(state?.item?.name);
  const [department_Old, setDepartment_Old] = useState<object>(
    state?.item?.department
  );

  const [modalShowCheckCate, setModalShowCheckCate] = useState(false);
  const [postItemCheckCate, setPostItemCheckCate] = useState<object>();
  const [postCate, setPostCate] = useState<object>();

  const onSubmitFnCate = async (status: number) => {
    setModalShowCheckCate(false);
    if (status == 1) {
      try {
        const res = await axios(
          configAxios("put", `${API.updateCategory}${state.id}`, postCate)
        );
        checkStatus(res, "แก้ไขหมวดหมู่ครุภัณฑ์เสร็จสิ้น");
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
        <h3>แก้ไขหมวดหมู่</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {modalShowCheckCate && (
        <ModalPostCate
          modalShowCheckCate={modalShowCheckCate}
          onSubmitFnCate={onSubmitFnCate}
          chackDataCate={postItemCheckCate}
        />
      )}
      <FormEditCategory
        name_Old={name_Old}
        department_Old={department_Old}
        setModalShowCheckCate={setModalShowCheckCate}
        setPostCate={setPostCate}
        setPostItemCheckCate={setPostItemCheckCate}
      />
    </div>
  );
}

export default EditCategory;
