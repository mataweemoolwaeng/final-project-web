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

function FormEditBuilding(props: any) {
  const navigate = useNavigate();
  const {
    nameTH_Old,
    nameEN_Old,
    facultyFId_Old,
    faculty_Old,
    departmentDId_Old,
    department_Old,
    setModalShowCheckBuilding,
    setPostBuildingCheck,
    setPostBuilding,
  } = props;

  const [getFaculty, setGetFaculty] = useState<{}>({});
  const [getDepartment, setGetDepartment] = useState<{}>({});
  const [nameTH, setnameTH] = useState<string>(nameTH_Old);
  const [nameEN, setnameEN] = useState<string>(nameEN_Old);

  const [facultyFId, setFacultyFId] = useState<number>(0);
  const [departmentDId, setdepartmentDId] = useState<number>(0);
  // console.log("departmentDId = " + departmentDId);

  const [boxCheck, setBoxCheck] = useState<any>(false);
  // console.log("boxCheck = ", boxCheck);

  useEffect(() => {
    let arrCheck = [];
    if (nameTH !== nameTH_Old && nameTH) {
      arrCheck.push(true);
    } else if (nameEN !== nameEN_Old && nameEN) {
      arrCheck.push(true);
    } else {
      arrCheck.push(false);
    }

    if (facultyFId != facultyFId_Old && facultyFId != 0) {
      arrCheck.push(true);
    } else {
      arrCheck.push(false);
    }
    if (departmentDId != departmentDId_Old && departmentDId != 0) {
      arrCheck.push(true);
    } else {
      arrCheck.push(false);
    }

    // console.log("arrCheck", arrCheck);
    if (arrCheck[0] && arrCheck[1] && arrCheck[2]) {
      setBoxCheck(true);
    } else if (arrCheck[1] && arrCheck[2]) {
      setBoxCheck(true);
    } else if (arrCheck[0] && arrCheck[2]) {
      setBoxCheck(true);
    } else if (arrCheck[0] && !arrCheck[1] && !arrCheck[2]) {
      setBoxCheck(true);
    } else if (arrCheck[2]) {
      setBoxCheck(true);
    } else {
      setBoxCheck(false);
    }
  }, [nameTH, nameEN, facultyFId, departmentDId]);

  // getFaculty
  useMemo(async () => {
    try {
      const resFacu = await axios(configAxios("get", API.getFaculty));
      setGetFaculty(resFacu.data);
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);
  useMemo(async () => {
    try {
      if (facultyFId != 0 || facultyFId_Old) {
        const res = await axios(
          configAxios(
            "get",
            `${API.getDepartmentByFtyId}${
              facultyFId != 0 ? facultyFId : facultyFId_Old
            }`
          )
        );
        setGetDepartment(res.data);
      }
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, [facultyFId, facultyFId_Old]);

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
      department: _.filter(getDepartment, (item: any) => {
        return (
          item.d_id ==
          (departmentDId != departmentDId_Old && departmentDId != 0
            ? departmentDId
            : departmentDId_Old)
        );
      }),
    };
    const dataform = {
      nameTH: nameTH != nameTH_Old ? nameTH : nameTH_Old,
      nameEN: nameEN != nameEN_Old ? nameEN : nameEN_Old,
      //
      facultyFId:
        facultyFId != facultyFId_Old && facultyFId != 0
          ? facultyFId
          : facultyFId_Old,
      departmentDId:
        departmentDId != departmentDId_Old && departmentDId != 0
          ? departmentDId
          : departmentDId_Old,

      //
    };
    // console.log(obj);
    // console.log(dataform);
    setPostBuildingCheck(obj);
    setPostBuilding(dataform);
    setModalShowCheckBuilding(true);
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
          <Form.Label>ชื่อ(ไทย)</Form.Label>
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
          <Form.Label>ชื่อ(อังกฤษ)</Form.Label>
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
          <Form.Label>
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
              setdepartmentDId(0);
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
        {/*  */}
        <Form.Group className="mb-3" controlId="formFaculty">
          <Form.Label>
            สาขา ตอนนี้อยู่{" "}
            <span style={{ color: "#4c00ff", fontSize: 18 }}>
              ({department_Old?.nameTH + " " + department_Old?.nameEN})
            </span>
          </Form.Label>
          <Form.Select
            disabled={getUserAdmin == false ? true : false}
            value={departmentDId}
            style={{
              borderColor:
                departmentDId != departmentDId_Old && departmentDId != 0
                  ? colors.borderColorEdit
                  : "",
            }}
            onChange={(event: any) => {
              const value = event.target.value;
              setdepartmentDId(value);
            }}
            size="lg"
          >
            <option value={0}>กรุณาเลือกสาขา</option>

            {_.map(getDepartment, (item: any) => {
              return (
                <>
                  <option key={item.d_id} value={item.d_id}>
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
              if (boxCheck) {
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
            variant={boxCheck ? "success" : "secondary"}
            type="submit"
            size="lg"
          >
            {boxCheck ? "บันทึก" : "ยังไม่มีข้อมูลเปลี่ยนแปลง"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormEditBuilding;
