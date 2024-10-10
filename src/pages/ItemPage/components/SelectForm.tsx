// import { useState } from "react";
import Button from "react-bootstrap/Button";
// import FormAddItem from "./FormAddItem";

function SelectForm(props: any) {
  const { setShowFrom, showFrom } = props;

  const selectedItem = (type: string) => {
    setShowFrom(type);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="m-1">
        <Button
          onClick={() => {
            selectedItem("AddItem");
          }}
          variant={showFrom == "AddItem" ? "success" : "outline-dark"}
          size="lg"
        >
          เพิ่ม ครุภัณฑ์
        </Button>
      </div>
      <div className="m-1">
        <Button
          onClick={() => {
            selectedItem("AddType");
          }}
          variant={showFrom == "AddType" ? "success" : "outline-dark"}
          size="lg"
        >
          เพิ่ม ชนิดครุภัณฑ์
        </Button>
      </div>
      <div className="m-1">
        <Button
          onClick={() => {
            selectedItem("AddCategory");
          }}
          variant={showFrom == "AddCategory" ? "success" : "outline-dark"}
          size="lg"
        >
          เพิ่ม หมวดหมู่ครุภัณฑ์
        </Button>
      </div>
    </div>
  );
}

export default SelectForm;
