import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import configAxios from "../../../../axios/configAxios";
import { API } from "../../../../axios/swr/endpoint";
import { sweet_basic } from "../../../../components/sweetalert2/sweet";
import checkToken from "../../../../config/checkToken";
import colors from "../../../../config/colors";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

function FormEditDepartment(props: any) {
  const navigate = useNavigate();
  const {
    nameTH_Old,
    nameEN_Old,
    facultyFId_Old,
    faculty_Old,
    setModalShowCheckDepartment,
    setPostDepartmentCheck,
    setPostDepartment,
  } = props;

  const [getFaculty, setGetFaculty] = useState<{}>({});
  const [nameTH, setnameTH] = useState<string>(nameTH_Old);
  const [nameEN, setnameEN] = useState<string>(nameEN_Old);

  const [facultyFId, setFacultyFId] = useState<number>(0);

  // getFaculty
  useMemo(async () => {
    try {
      const resFacu = await axios(configAxios("get", API.getFaculty));
      setGetFaculty(resFacu.data);
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const obj = {
      nameTH: nameTH != nameTH_Old ? nameTH : nameTH_Old,
      nameEN: nameEN != nameEN_Old ? nameEN : nameEN_Old,
      faculty: _.filter(getFaculty, (item: any) => {
        return (
          item.f_id ==
          (facultyFId != facultyFId_Old && facultyFId != 0
            ? facultyFId
            : facultyFId_Old)
        );
      }),
    };
    const dataform = {
      nameTH: nameTH != nameTH_Old ? nameTH : nameTH_Old,
      nameEN: nameEN != nameEN_Old ? nameEN : nameEN_Old,
      facultyFId:
        facultyFId != facultyFId_Old && facultyFId != 0
          ? facultyFId
          : facultyFId_Old,
    };
    // console.log(obj);
    // console.log(dataform);
    setPostDepartmentCheck(obj);
    setPostDepartment(dataform);
    setModalShowCheckDepartment(true);
  };

  const [getUserAdmin, setGetUserAdmin] = useState<boolean>(true);
  // console.log(getUserAdmin);
  // const [getProfile, setGetProfile] = useState<any>({});
  useEffect(() => {
    let userAdmin: any = localStorage.getItem("UserAdmin");
    // let profile: any = localStorage.getItem("Profile");
    // profile = JSON.parse(profile);
    // console.log(profile);

    if (userAdmin == "true") {
      setGetUserAdmin(true);
    } else {
      setGetUserAdmin(false);
    }
  }, []);
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
        {/*  */}
        <Form.Group className="mb-3" controlId="formFaculty">
          <Form.Label style={{ fontSize: 22 }}>
            คณะ ตอนนี้อยู่{" "}
            <span style={{ color: "#4c00ff", fontSize: 18 }}>
              ({faculty_Old?.nameTH + " " + faculty_Old?.nameEN})
            </span>
          </Form.Label>
          <Form.Select
            disabled={getUserAdmin == false ? true : false}
            style={{
              borderColor:
                facultyFId != facultyFId_Old && facultyFId != 0
                  ? colors.borderColorEdit
                  : "",
            }}
            onChange={(event: any) => {
              const value = event.target.value;
              setFacultyFId(value);
            }}
            size="lg"
          >
            <option value={0}>กรุณาเลือกคณะ</option>

            {_.map(getFaculty, (item: any) => {
              return (
                <>
                  <option key={item.f_id} value={item.f_id}>
                    {item.nameTH} {item.nameEN}
                  </option>
                </>
              );
            })}
          </Form.Select>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button
            // style={{}}
            onClick={(event) => {
              if (
                (nameTH !== nameTH_Old && nameTH) ||
                (nameEN !== nameEN_Old && nameEN) ||
                (facultyFId != facultyFId_Old && facultyFId != 0)
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
              (nameEN !== nameEN_Old && nameEN) ||
              (facultyFId != facultyFId_Old && facultyFId != 0)
                ? "success"
                : "secondary"
            }
            type="submit"
            size="lg"
          >
            {(nameTH !== nameTH_Old && nameTH) ||
            (nameEN !== nameEN_Old && nameEN) ||
            (facultyFId != facultyFId_Old && facultyFId != 0)
              ? "บันทึก"
              : "ยังไม่มีข้อมูลเปลี่ยนแปลง"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormEditDepartment;
