import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import configAxios from "../../axios/configAxios";
import { API } from "../../axios/swr/endpoint";
import ButtonBack from "../../components/buttons/ButtonBack";
import NavbarTop from "../../components/navbar/NavbarTop";
import checkToken from "../../config/checkToken";
import FormEditItem from "./components/editItem/FormEditItem";
import FormEditStatus from "./components/editItem/FormEditStatus";
import HistoryItem from "./components/editItem/HistoryItem";
import ModalPostEdit from "../../components/modal/ModalPostEdit";
import checkStatus from "../../config/checkStatus";
import DeleteItem from "../../components/buttons/DeleteItem";
import { GetKanitFont } from "../../config/fonts";
import ModalDeletel from "../../components/modal/ModalDeletel";
import FormEditImgItem from "./components/editItem/FormEditImgItem";
import ModalUpImgItem from "../../components/modal/ModalUpImgItem";
import isPageEdit from "../../config/editpage/isPageEdit";
import NavbarItem from "../../components/navbar/NavbarItem";
import ModalDownloadSwap from "../../components/download/ModalDownloadSwap";
function EditItem() {
  const navigate = useNavigate();
  // const { state } = useLocation();

  let idItem = localStorage.getItem("itemItemEdit");
  let isEdit = localStorage.getItem("itemItemEditIs");
  useEffect(() => {
    // console.log("state", state);
    // localStorage.setItem("itemItemEdit", state.id);
    //  console.log(idItem);
  }, [localStorage.getItem("itemItemEdit")]);

  const [getItems, setGetItems] = useState<any>();
  const [edit_updateEn, setedit_updateEn] = useState(false);

  const [modalShowCheckEditItem, setModalShowCheckEditItem] = useState(false);
  const [postEditItemCheck, setPostEditItemCheck] = useState<object>();
  const [postEditItem, setPostEditItem] = useState<object>();

  const [modalShowCheckUpdateItem, setModalShowCheckUpdateItem] =
    useState(false);
  const [postUpdateItemCheck, setPostUpdateItemCheck] = useState<object>();
  const [postUpdateItem, setPostUpdateItem] = useState<object>();
  // console.log(postEditItem);
  const [userUrl, setuserUrl] = useState<boolean>(false);

  useMemo(async () => {
    try {
      let res;
      res = await axios(configAxios("get", `${API.getItemById}${idItem}`));
      setGetItems(res.data);
    } catch (error: any) {
      // console.log("err = ", error.request.status);
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, [edit_updateEn]);

  const onSubmitFnEditItem = async (status: number) => {
    setModalShowCheckEditItem(false);
    let sendUrl = userUrl ? API.updateItemPhoto : API.updateItem;
    if (status == 1) {
      try {
        const res = await axios(
          configAxios("put", `${sendUrl}${idItem}`, postEditItem)
        );
        checkStatus(res, "แก้ไขครุภัณฑ์เสร็จสิ้น");
        setedit_updateEn(!edit_updateEn);
      } catch (error: any) {
        checkToken(error.response.data.status, error.request.status, navigate);
      }
    }
  };
  //
  const [userUrlStatus, setuserUrlStatus] = useState<boolean>(false);
  const onSubmitFnUpdateItem = async (status: number) => {
    setModalShowCheckUpdateItem(false);
    if (status == 1) {
      let sendUrl = userUrlStatus ? API.updateStetusPhoto : API.updateStetus;
      try {
        const res = await axios(configAxios("post", sendUrl, postUpdateItem));
        checkStatus(res, "ย้ายสถานที่หรือเปลี่ยนถานะครุภัณฑ์เสร็จสิ้น");
        setedit_updateEn(!edit_updateEn);
      } catch (error: any) {
        checkToken(error.response.data.status, error.request.status, navigate);
      }
    }
  };

  const [modalShowCheckUpImgItem, setModalShowCheckUpImgItem] = useState(false);
  const [postEditImgItemCheck, setPostEditImgItemCheck] = useState<object>();
  const [postEditImgItem, setPostEditImgItem] = useState<FormData>();
  const [postEditImgItemFn, setPostEditImgItemFn] = useState<boolean>(false);
  const [lodingSwap, setLodingSwap] = useState<boolean>(false);
  //
  const onSubmitFnImgItem = async (status: number) => {
    setModalShowCheckUpImgItem(false);

    if (status == 1) {
      setLodingSwap(true);
      try {
        const res = await axios(
          configAxios("post", API.createImgItems, postEditImgItem)
        );
        setLodingSwap(false);
        checkStatus(res, "เพิ่มรูปครุภัณฑ์เสร็จสิ้น");
        setedit_updateEn(!edit_updateEn);
        setPostEditImgItemFn(!postEditImgItemFn);
      } catch (error: any) {
        checkToken(error.response.data.status, error.request.status, navigate);
      }
    }
  };

  const [modalShowDeletel, setModalShowDeletel] = useState(false);
  // // console.log(modalShowDeletel);
  // const onSubmitFnDeletel = async (status: number) => {
  //   setModalShowDeletel(false);
  // };
  const resetItem = () => {
    setedit_updateEn(!edit_updateEn);
  };
  const clickPage = "items";
  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={clickPage} />
      <NavbarItem clickPage={clickPage} />
      <div className="d-flex justify-content-center mt-5 mb-2">
        {/* <h3>แก้ไขครุภัณฑ์</h3> */}
        {getItems && (
          <>
            {isEdit === isPageEdit.image && (
              <h3>แก้ไขรูปภาพครุภัณฑ์ {getItems?.name}</h3>
            )}
            {isEdit === isPageEdit.details && <h3>แก้ไขรายละเอียดครุภัณฑ์</h3>}
            {isEdit === isPageEdit.status && (
              <h3>แก้ไขสถานะครุภัณฑ์ {getItems?.name}</h3>
            )}
          </>
        )}
      </div>
      {isEdit === isPageEdit.details && (
        <div className="d-flex justify-content-between">
          <div>{/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}</div>
          <div>
            <DeleteItem
              titleButton={"ลบครุภัณฑ์"}
              setModal={setModalShowDeletel}
            />
          </div>
        </div>
      )}
      {lodingSwap && (
        <ModalDownloadSwap
          show={lodingSwap}
          onHide={() => setLodingSwap(false)}
        />
      )}
      {modalShowCheckUpImgItem && (
        <ModalUpImgItem
          onSubmitFnImgItem={onSubmitFnImgItem}
          modalShowCheckUpImgItem={modalShowCheckUpImgItem}
          title={"เพิ่มรูปครุภัณฑ์"}
          chackImg={postEditImgItemCheck}
        />
      )}
      {modalShowDeletel && (
        <ModalDeletel
          setModal={setModalShowDeletel}
          modalShowDeletel={modalShowDeletel}
          title={"ครุภัณฑ์"}
          item={getItems}
          isPage={"item"}
        />
      )}
      {modalShowCheckEditItem && (
        <ModalPostEdit
          onSubmitFnEdit={onSubmitFnEditItem}
          modalShowCheckEditItem={modalShowCheckEditItem}
          chackDataEdit={postEditItemCheck}
          isEdit={"item"}
          title={"การแก้ไขข้อมูลครุภัณฑ์"}
        />
      )}
      {modalShowCheckUpdateItem && (
        <ModalPostEdit
          onSubmitFnEdit={onSubmitFnUpdateItem}
          modalShowCheckEditItem={modalShowCheckUpdateItem}
          chackDataEdit={postUpdateItemCheck}
          isEdit={"status"}
          title={"การย้ายสถานที่หรือเปลี่ยนสถานะ"}
        />
      )}
      {isEdit === isPageEdit.image && getItems && (
        <FormEditImgItem
          getItems={getItems}
          setModalShowCheckUpImgItem={setModalShowCheckUpImgItem}
          setPostEditImgItemCheck={setPostEditImgItemCheck}
          setPostEditImgItem={setPostEditImgItem}
          postEditImgItemFn={postEditImgItemFn}
          setedit_updateEn={setedit_updateEn}
          edit_updateEn={edit_updateEn}
        />
      )}
      {isEdit === isPageEdit.details && getItems && (
        <FormEditItem
          getItems={getItems}
          setModalShowCheckEditItem={setModalShowCheckEditItem}
          setPostEditItemCheck={setPostEditItemCheck}
          setPostEditItem={setPostEditItem}
          setuserUrl={setuserUrl}
        />
      )}
      <div className="mt-5">
        {isEdit === isPageEdit.status && getItems && (
          <FormEditStatus
            setuserUrlStatus={setuserUrlStatus}
            getItems={getItems}
            setModalShowCheckUpdateItem={setModalShowCheckUpdateItem}
            setPostUpdateItemCheck={setPostUpdateItemCheck}
            setPostUpdateItem={setPostUpdateItem}
          />
        )}
      </div>

      <div className="mt-5">
        {isEdit === isPageEdit.status && getItems && (
          <HistoryItem getItems={getItems} resetItem={resetItem} />
        )}
      </div>
    </div>
  );
}

export default EditItem;
