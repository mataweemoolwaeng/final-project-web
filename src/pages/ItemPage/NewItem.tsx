import { useState } from "react";
import NavbarTop from "../../components/navbar/NavbarTop";
// import ButtonBack from "../../components/buttons/ButtonBack";
import FormAddItem from "./components/FormAddItem";
import SelectForm from "./components/SelectForm";
import FormAddTypeItem from "./components/FormAddTypeItem";
import FormAddCateItem from "./components/FormAddCateItem";
import ModalPostItem from "../../components/modal/ModalPostItem";
import axios from "axios";
import configAxios from "../../axios/configAxios";
import { API } from "../../axios/swr/endpoint";
import { useNavigate } from "react-router-dom";
import checkToken from "../../config/checkToken";

import checkStatus from "../../config/checkStatus";
import ModalPostCate from "../../components/modal/ModalPostCate";
import ModalPostType from "../../components/modal/ModalPostType";
import { GetKanitFont } from "../../config/fonts";
import NavbarItem from "../../components/navbar/NavbarItem";

function NewItem() {
  const navigate = useNavigate();
  const [showFrom, setShowFrom] = useState<string>("AddItem");
  const [modalShowCheck, setModalShowCheck] = useState(false);
  const [modalShowCheckCate, setModalShowCheckCate] = useState(false);
  const [modalShowCheckType, setModalShowCheckType] = useState(false);
  const [postItemCheck, setPostItemCheck] = useState<object>();
  const [postItemCheckCate, setPostItemCheckCate] = useState<object>();
  const [postItemCheckType, setPostItemCheckType] = useState<object>();
  const [postItem, setPostItem] = useState<object>();
  const [postTypeItem, setPostTypeItem] = useState<object>();
  const [postCate, setPostCate] = useState<object>();

  // FormNewItem
  const [nameItem, setNameItem] = useState<string>("");
  const [codeItem, setCodeItem] = useState<string>("");
  //
  const [userUrl, setuserUrl] = useState<boolean>(false);

  // Submit
  const onSubmitFn = async (status: number) => {
    setModalShowCheck(false);
    let sendUrl = userUrl ? API.createItemPhoto : API.createItem;
    // console.log(sendUrl);
    if (status == 1) {
      try {
        const res = await axios(configAxios("post", sendUrl, postItem));
        checkStatus(res, "เพิ่มครุภัณฑ์เสร็จสิ้น");
      } catch (error: any) {
        checkToken(error.response.data.status, error.request.status, navigate);
      }
    }
  };
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

  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={"items"} />
      <NavbarItem clickPage={"items"} />
      <div className="d-flex justify-content-center mt-4 mb-2">
        <h3>เพิ่มครุภัณฑ์</h3>
      </div>
      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      <SelectForm setShowFrom={setShowFrom} showFrom={showFrom} />
      {/* Modal */}
      {modalShowCheck && (
        <ModalPostItem
          modalShowCheck={modalShowCheck}
          onSubmitFn={onSubmitFn}
          chackData={postItemCheck}
        />
      )}
      {modalShowCheckType && (
        <ModalPostType
          chackDataType={postItemCheckType}
          onSubmitFnType={onSubmitFnType}
          modalShowCheckType={modalShowCheckType}
        />
      )}
      {modalShowCheckCate && (
        <ModalPostCate
          modalShowCheckCate={modalShowCheckCate}
          onSubmitFnCate={onSubmitFnCate}
          chackDataCate={postItemCheckCate}
        />
      )}
      {/*  */}
      {showFrom == "AddItem" && (
        <FormAddItem
          nameItem={nameItem}
          setNameItem={setNameItem}
          codeItem={codeItem}
          setCodeItem={setCodeItem}
          setPostItemCheck={setPostItemCheck}
          setModalShowCheck={setModalShowCheck}
          setPostItem={setPostItem}
          setuserUrl={setuserUrl}
        />
      )}
      {/*  */}
      {showFrom == "AddType" && (
        <FormAddTypeItem
          setModalShowCheckType={setModalShowCheckType}
          setPostItemCheckType={setPostItemCheckType}
          setPostTypeItem={setPostTypeItem}
        />
      )}
      {/*  */}
      {showFrom == "AddCategory" && (
        <FormAddCateItem
          setModalShowCheckCate={setModalShowCheckCate}
          setPostCate={setPostCate}
          setPostItemCheckCate={setPostItemCheckCate}
        />
      )}
    </div>
  );
}

export default NewItem;

/*
   const dataform = {
      name: nameItem,
      code: codeItem,
      status_item: status,
      faculty: idFty,
      department: idDpm,
      building: IdBud,
      location: idLocat,
      typeItemType: idType,
    };
    setPostItem(dataform);


*/
