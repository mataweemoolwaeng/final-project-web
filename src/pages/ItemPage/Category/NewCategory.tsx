import { useState } from "react";
import ButtonBack from "../../../components/buttons/ButtonBack";
import NavbarTop from "../../../components/navbar/NavbarTop";
import { GetKanitFont } from "../../../config/fonts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configAxios from "../../../axios/configAxios";
import { API } from "../../../axios/swr/endpoint";
import checkStatus from "../../../config/checkStatus";
import checkToken from "../../../config/checkToken";
import FormAddCateItem from "../components/FormAddCateItem";
import ModalPostCate from "../../../components/modal/ModalPostCate";
import NavbarItem from "../../../components/navbar/NavbarItem";

function NewCateItem() {
  const navigate = useNavigate();

  const [modalShowCheckCate, setModalShowCheckCate] = useState(false);
  const [postItemCheckCate, setPostItemCheckCate] = useState<object>();
  const [postCate, setPostCate] = useState<object>();

  const onSubmitFnCate = async (status: number) => {
    setModalShowCheckCate(false);
    if (status == 1) {
      try {
        const res = await axios(
          configAxios("post", API.createCategory, postCate)
        );
        checkStatus(res, "เพิ่มหมวดหมู่ครุภัณฑ์เสร็จสิ้น");
      } catch (error: any) {
        checkToken(error.response.data.status, error.request.status, navigate);
      }
    }
  };
  const clickPage = "items";
  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop />
      <NavbarItem clickPage={clickPage} />
      <div className="d-flex justify-content-center mt-4 mb-2">
        <h3>เพิ่มหมวดหมู่ครุภัณฑ์</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {modalShowCheckCate && (
        <ModalPostCate
          modalShowCheckCate={modalShowCheckCate}
          onSubmitFnCate={onSubmitFnCate}
          chackDataCate={postItemCheckCate}
        />
      )}
      <FormAddCateItem
        setModalShowCheckCate={setModalShowCheckCate}
        setPostCate={setPostCate}
        setPostItemCheckCate={setPostItemCheckCate}
      />
    </div>
  );
}

export default NewCateItem;
