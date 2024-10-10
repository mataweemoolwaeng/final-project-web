import { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { sweet_basic } from "../../../../components/sweetalert2/sweet";
import colors from "../../../../config/colors";

function FormEditFaculty(props: any) {
  const {
    nameTH_Old,
    nameEN_Old,
    setModalShowCheckFaculty,
    setPostFacultyCheck,
  } = props;

  const [nameTH, setnameTH] = useState<string>(nameTH_Old);
  const [nameEN, setnameEN] = useState<string>(nameEN_Old);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const dataform = {
      nameTH: nameTH != nameTH_Old ? nameTH : nameTH_Old,
      nameEN: nameEN != nameEN_Old ? nameEN : nameEN_Old,
    };
    // console.log(dataform);

    setPostFacultyCheck(dataform);
    setModalShowCheckFaculty(true);
  };
  return (
    <Container style={{ borderRadius: 15, width: "100%", height: "100%" }}>
      <Form>
        {/* nameTH */}
        <Form.Group className="mb-2">
          <Form.Label style={{ fontSize: 22 }}>ชื่อ(ไทย)</Form.Label>
          <Form.Control
            size="lg"
            style={{
              borderColor:
                nameTH !== nameTH_Old && nameTH ? colors.borderColorEdit : "",
            }}
            type="text"
            placeholder="ชื่อ(ไทย)"
            value={nameTH == nameTH_Old ? nameTH_Old : nameTH}
            onChange={(event: any) => {
              const value = event.target.value;
              setnameTH(value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label style={{ fontSize: 22 }}>ชื่อ(อังกฤษ)</Form.Label>
          <Form.Control
            size="lg"
            style={{
              borderColor:
                nameEN !== nameEN_Old && nameEN ? colors.borderColorEdit : "",
            }}
            type="text"
            placeholder="ชื่อ(อังกฤษ)"
            value={nameEN == nameEN_Old ? nameEN_Old : nameEN}
            onChange={(event: any) => {
              const value = event.target.value;
              setnameEN(value);
            }}
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button
            // style={{}}
            onClick={(event) => {
              if (
                (nameTH !== nameTH_Old && nameTH) ||
                (nameEN !== nameEN_Old && nameEN)
              ) {
                onSubmit(event);
              } else {
                event.preventDefault();
                sweet_basic(
                  "warning",
                  "ยังไม่มีข้อมูลเปลี่ยนแปลง",
                  "กรุณาแก้ไขข้อมูล"
                );
              }
            }}
            className="mb-3 mt-3 p-2"
            variant={
              (nameTH !== nameTH_Old && nameTH) ||
              (nameEN !== nameEN_Old && nameEN)
                ? "success"
                : "secondary"
            }
            type="submit"
            size="lg"
          >
            {(nameTH !== nameTH_Old && nameTH) ||
            (nameEN !== nameEN_Old && nameEN)
              ? "บันทึก"
              : "ยังไม่มีข้อมูลเปลี่ยนแปลง"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormEditFaculty;
