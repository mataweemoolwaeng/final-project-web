import { useState, useMemo, useEffect } from "react";
import _ from "lodash";
import { Button, Form, Container } from "react-bootstrap";
import { sweet_basic } from "../../../../components/sweetalert2/sweet";
import axios from "axios";
import configAxios from "../../../../axios/configAxios";
import { API } from "../../../../axios/swr/endpoint";
import checkToken from "../../../../config/checkToken";
import { useNavigate } from "react-router-dom";

function FormInputLocation(props: any) {
  const { setModalShowCheckLocation, setPostLocationCheck, setPostLocation } =
    props;
  const navigate = useNavigate();
  const [getFaculty, setGetFaculty] = useState<{}>({});
  const [getDepartment, setGetDepartment] = useState<{}>({});
  const [getBuilding, setGetBuilding] = useState<{}>({});

  const [nameLocationTH, setNameLocationTH] = useState<string>();
  const [nameLocationEN, setNameLocationEN] = useState<string>();
  const [floor, setFloor] = useState<any>();

  const [facultyFId, setFacultyFId] = useState<number>(0);
  const [departmentDId, setDepartmentDId] = useState<number>(0);
  const [buildingBId, setBuildingBId] = useState<number>(0);

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
  //  setGetBuilding
  useMemo(async () => {
    try {
      if (departmentDId != 0) {
        const res = await axios(
          configAxios("get", `${API.getBuildingByDpmId}${departmentDId}`)
        );
        setGetBuilding(res.data);
      }
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, [departmentDId]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const obj = {
      nameTH: nameLocationTH,
      nameEN: nameLocationEN,
      floor: floor,
      faculty: _.filter(getFaculty, (item: any) => {
        return item.f_id == facultyFId;
      }),
      department: _.filter(getDepartment, (item: any) => {
        return item.d_id == departmentDId;
      }),
      building: _.filter(getBuilding, (item: any) => {
        return item.b_id == buildingBId;
      }),
    };
    const dataform = {
      nameTH: nameLocationTH,
      nameEN: nameLocationEN,
      floor: floor,
      facultyFId: facultyFId,
      departmentDId: departmentDId,
      buildingBId: buildingBId,
    };

    setPostLocationCheck(obj);
    setPostLocation(dataform);
    setModalShowCheckLocation(true);
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
          <Form.Label>ชื่อสถานที่ (ไทย)</Form.Label>
          <Form.Control
            size="lg"
            // style={{ height: "3rem" }}
            type="text"
            placeholder="ชื่อสถานที่ (ไทย)"
            value={nameLocationTH}
            onChange={(event: any) => {
              const value = event.target.value;
              setNameLocationTH(value);
            }}
          />
        </Form.Group>
        {/* nameEN */}
        <Form.Group className="mb-2" controlId="formNameItem">
          <Form.Label>ชื่อสถานที่ (อังกฤษ)</Form.Label>
          <Form.Control
            size="lg"
            // style={{ height: "3rem" }}
            type="text"
            placeholder="ชื่อสถานที่ (อังกฤษ)"
            value={nameLocationEN}
            onChange={(event: any) => {
              const value = event.target.value;
              setNameLocationEN(value);
            }}
          />
        </Form.Group>
        {/*  */}
        <Form.Group controlId="formFloor">
          <Form.Label>ชั้นที่</Form.Label>
          <Form.Control
            min={"0"}
            size="lg"
            type="number"
            placeholder="ระบุชั้น"
            value={floor}
            onChange={(event) => {
              const value = event.target.value;
              setFloor(value);
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
                setBuildingBId(0);
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
              if (value == 0) {
                setBuildingBId(0);
              }
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
        {/*  */}
        <Form.Group className="mb-3" controlId="formDepartment">
          <Form.Label>อาคาร</Form.Label>
          <Form.Select
            disabled={departmentDId == 0 ? true : false}
            onChange={(event: any) => {
              const value = event.target.value;
              setBuildingBId(value);
            }}
            size="lg"
          >
            {departmentDId != 0 ? (
              <option value={0}>กรุณาเลือกอาคาร</option>
            ) : (
              <option value={0}>กรุณาเลือกสาขา</option>
            )}
            {_.map(getBuilding, (item: any, idx) => {
              return (
                <>
                  <option key={item.b_id} value={item.b_id}>
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
                nameLocationTH &&
                nameLocationEN &&
                facultyFId != 0 &&
                departmentDId != 0 &&
                buildingBId != 0 &&
                floor >= 0 && floor
              ) {
                onSubmit(event);
              } else {
                event.preventDefault();
                sweet_basic("warning", "ข้อมูลไม่ครบ", "กรุณากรอกข้อมูลให้ครบ");
              }
            }}
            className="mb-3 mt-3 p-2"
            variant={
              nameLocationTH &&
              nameLocationEN &&
              facultyFId != 0 &&
              departmentDId != 0 &&
              buildingBId != 0 &&
              floor >= 0 &&  floor
                ? "success"
                : "secondary"
            }
            type="submit"
            size="lg"
          >
            {nameLocationTH &&
            nameLocationEN &&
            facultyFId != 0 &&
            departmentDId != 0 &&
            buildingBId != 0 &&
            floor >= 0 && floor
              ? "บันทึก"
              : "กรุณากรอกข้อมูลให้ครบ"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormInputLocation;
