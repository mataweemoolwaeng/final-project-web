import { useState } from "react";
// import _ from "lodash";
import { Button, Form, Container } from "react-bootstrap";
import { sweet_basic } from "../../../../components/sweetalert2/sweet";

function FormInputFaculty(props: any) {
  const { setModalShowCheckFaculty, setPostFacultyCheck } = props;
  const [nameFacultyTH, setNameCategoryTH] = useState<string>();
  const [nameFacultyEN, setNameCategoryEN] = useState<string>();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const dataform = {
      nameTH: nameFacultyTH,
      nameEN: nameFacultyEN,
    };
    setPostFacultyCheck(dataform);
    setModalShowCheckFaculty(true);
  };
  return (
    <Container style={{ borderRadius: 15, width: "100%", height: "100%" }}>
      <Form>
        {/* nameTH */}
        <Form.Group className="mb-2" controlId="formNameItem">
          <Form.Label>ชื่อคณะ (ไทย)</Form.Label>
          <Form.Control
            size="lg"
            // style={{ height: "3rem" }}
            type="text"
            placeholder="ชื่อคณะ (ไทย)"
            value={nameFacultyTH}
            onChange={(event: any) => {
              const value = event.target.value;
              setNameCategoryTH(value);
            }}
          />
        </Form.Group>
        {/* nameEN */}
        <Form.Group className="mb-2" controlId="formNameItem">
          <Form.Label>ชื่อคณะ (อังกฤษ)</Form.Label>
          <Form.Control
            size="lg"
            // style={{ height: "3rem" }}
            type="text"
            placeholder="ชื่อคณะ (อังกฤษ)"
            value={nameFacultyEN}
            onChange={(event: any) => {
              const value = event.target.value;
              setNameCategoryEN(value);
            }}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button
            // style={{}}
            onClick={(event) => {
              if (nameFacultyTH && nameFacultyEN) {
                onSubmit(event);
              } else {
                event.preventDefault();
                sweet_basic("warning", "ข้อมูลไม่ครบ", "กรุณากรอกข้อมูลให้ครบ");
              }
            }}
            className="mb-3 mt-3 p-2"
            variant={nameFacultyTH && nameFacultyEN ? "success" : "secondary"}
            type="submit"
            size="lg"
          >
            {nameFacultyTH && nameFacultyEN
              ? "บันทึก"
              : "กรุณากรอกข้อมูลให้ครบ"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormInputFaculty;
