import { useState, useMemo, useEffect } from "react";
import _ from "lodash";
import { Button, Form, Container } from "react-bootstrap";
import { sweet_basic } from "../../../../components/sweetalert2/sweet";
import axios from "axios";
import configAxios from "../../../../axios/configAxios";
import { API } from "../../../../axios/swr/endpoint";
import checkToken from "../../../../config/checkToken";
import { useNavigate } from "react-router-dom";

function FormInputBuilding(props: any) {
  const { setModalShowCheckBuilding, setPostBuildingCheck, setPostBuilding } =
    props;
  const navigate = useNavigate();
  const [getFaculty, setGetFaculty] = useState<{}>({});
  const [getDepartment, setGetDepartment] = useState<{}>({});

  const [nameBuildingTH, setNameBuildingTH] = useState<string>();
  const [nameBuildingEN, setNameBuildingEN] = useState<string>();
  const [facultyFId, setFacultyFId] = useState<number>(0);
  const [departmentDId, setDepartmentDId] = useState<number>(0);

  // getFaculty
  useMemo(async () => {
    try {
      const resFacu = await axios(configAxios("get", API.getFaculty));
      setGetFaculty(resFacu.data);
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);
  //  getDepartmentByFtyId
  useMemo(async () => {
    try {
      if (facultyFId != 0) {
        const res = await axios(
          configAxios("get", `${API.getDepartmentByFtyId}${facultyFId}`)
        );
        setGetDepartment(res.data);
      }
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, [facultyFId]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const obj = {
      nameTH: nameBuildingTH,
      nameEN: nameBuildingEN,
      faculty: _.filter(getFaculty, (item: any) => {
        return item.f_id == facultyFId;
      }),
      department: _.filter(getDepartment, (item: any) => {
        return item.d_id == departmentDId;
      }),
    };
    const dataform = {
      nameTH: nameBuildingTH,
      nameEN: nameBuildingEN,
      facultyFId: facultyFId,
      departmentDId: departmentDId,
    };

    setPostBuildingCheck(obj);
    setPostBuilding(dataform);
    setModalShowCheckBuilding(true);
  };

  const [getUserAdmin, setGetUserAdmin] = useState<boolean>(true);
  // console.log(getUserAdmin);
  const [getProfile, setGetProfile] = useState<any>({});
  useEffect(() => {
    let userAdmin: any = localStorage.getItem("UserAdmin");
    let profile: any = localStorage.getItem("Profile");
    profile = JSON.parse(profile);
    // console.log(profile);
    setGetProfile(profile);

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
        <Form.Group className="mb-2" controlId="formNameItem">
          <Form.Label>ชื่ออาคาร (ไทย)</Form.Label>
          <Form.Control
            size="lg"
            // style={{ height: "3rem" }}
            type="text"
            placeholder="ชื่ออาคาร (ไทย)"
            value={nameBuildingTH}
            onChange={(event: any) => {
              const value = event.target.value;
              setNameBuildingTH(value);
            }}
          />
        </Form.Group>
        {/* nameEN */}
        <Form.Group className="mb-2" controlId="formNameItem">
          <Form.Label>ชื่ออาคาร (อังกฤษ)</Form.Label>
          <Form.Control
            size="lg"
            // style={{ height: "3rem" }}
            type="text"
            placeholder="ชื่ออาคาร (อังกฤษ)"
            value={nameBuildingEN}
            onChange={(event: any) => {
              const value = event.target.value;
              setNameBuildingEN(value);
            }}
          />
        </Form.Group>
        {/*  */}
        <Form.Group className="mb-3" controlId="formFaculty">
          <Form.Label>คณะ</Form.Label>
          <Form.Select
            onChange={(event: any) => {
              const value = event.target.value;
              if (value == 0) {
                setDepartmentDId(0);
              }
              setFacultyFId(value);
            }}
            size="lg"
          >
            {getUserAdmin ? (
              <>
                <option value={0}>กรุณาเลือกคณะ</option>
                {_.map(getFaculty, (item: any, idx) => {
                  return (
                    <>
                      <option key={item.f_id} value={item.f_id}>
                        {item.nameTH} {item.nameEN}
                      </option>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                <option value={0}>กรุณาเลือกคณะ</option>
                <option value={getProfile?.facultyFId}>
                  {getProfile?.faculty?.nameTH} {getProfile?.faculty?.nameEN}
                </option>
              </>
            )}
          </Form.Select>
        </Form.Group>
        {/*  */}
        <Form.Group className="mb-3" controlId="formDepartment">
          <Form.Label>สาขา</Form.Label>
          <Form.Select
            disabled={facultyFId == 0 ? true : false}
            onChange={(event: any) => {
              const value = event.target.value;
              setDepartmentDId(value);
            }}
            size="lg"
          >
            {getUserAdmin ? (
              <>
                {facultyFId != 0 ? (
                  <option value={0}>กรุณาเลือกสาขา</option>
                ) : (
                  <option value={0}>กรุณาเลือกคณะ</option>
                )}
                {_.map(getDepartment, (item: any, idx) => {
                  return (
                    <>
                      <option key={item.d_id} value={item.d_id}>
                        {item.nameTH} {item.nameEN}
                      </option>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {facultyFId != 0 ? (
                  <>
                    <option value={0}>กรุณาเลือกสาขา</option>
                    <option value={getProfile?.departmentDId}>
                      {getProfile?.department?.nameTH}
                    </option>
                  </>
                ) : (
                  <option value={0}>กรุณาเลือกคณะ</option>
                )}
              </>
            )}
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button
            // style={{}}
            onClick={(event) => {
              if (
                nameBuildingTH &&
                nameBuildingEN &&
                facultyFId != 0 &&
                departmentDId != 0
              ) {
                onSubmit(event);
              } else {
                event.preventDefault();
                sweet_basic("warning", "ข้อมูลไม่ครบ", "กรุณากรอกข้อมูลให้ครบ");
              }
            }}
            className="mb-3 mt-3 p-2"
            variant={
              nameBuildingTH &&
              nameBuildingEN &&
              facultyFId != 0 &&
              departmentDId != 0
                ? "success"
                : "secondary"
            }
            type="submit"
            size="lg"
          >
            {nameBuildingTH &&
            nameBuildingEN &&
            facultyFId != 0 &&
            departmentDId != 0
              ? "บันทึก"
              : "กรุณากรอกข้อมูลให้ครบ"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormInputBuilding;
