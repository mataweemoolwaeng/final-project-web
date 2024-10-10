// import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pathRoutesPage from "../../../router/pathPage";
function ListButton(props: any) {
  const { setShow, show } = props;
  const editPage = pathRoutesPage.EditItem;
  const navigate = useNavigate();

  const navigatePage = () => {
    navigate(editPage);
  };
  return (
    <div className="d-flex flex-column">
      <Button
        className="mb-1"
        variant="outline-primary"
        onClick={() => {
          setShow(!show);
          localStorage.setItem("itemItemEditIs", "image");
          navigatePage()
        }}
      >
        <div className="d-flex">
          <div className="d-flex justify-content-center align-content-center">
            {/* <BiTrash size={20} /> */}
            <span>แก้ไขรูปครุภัณฑ์</span>
          </div>
          <div className=" d-flex justify-content-center align-content-center"></div>
        </div>
      </Button>
      <Button
        className="mb-1"
        variant="outline-warning"
        onClick={() => {
          setShow(!show);
          localStorage.setItem("itemItemEditIs", "details");
          navigatePage()
        }}
      >
        <div className="d-flex">
          <div className="d-flex justify-content-center align-content-center">
            {/* <BiTrash size={20} /> */}
            <span>แก้ไขรายละเอียดครุภัณฑ์</span>
          </div>
          <div className=" d-flex justify-content-center align-content-center"></div>
        </div>
      </Button>
      <Button
        className="mb-1"
        variant="outline-success"
        onClick={() => {
          setShow(!show);
          localStorage.setItem("itemItemEditIs", "status");
          navigatePage()
        }}
      >
        <div className="d-flex">
          <div className="d-flex justify-content-center align-content-center">
            {/* <BiTrash size={20} /> */}
            <span>แก้ไขสถานะครุภัณฑ์</span>
          </div>
          <div className=" d-flex justify-content-center align-content-center"></div>
        </div>
      </Button>
    </div>
  );
}

export default ListButton;
