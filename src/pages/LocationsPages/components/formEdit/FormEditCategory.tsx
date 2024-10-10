import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import configAxios from "../../../../axios/configAxios";
import { API } from "../../../../axios/swr/endpoint";
import checkToken from "../../../../config/checkToken";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { sweet_basic } from "../../../../components/sweetalert2/sweet";
import colors from "../../../../config/colors";

function FormEditCategory(props: any) {
  const {
    setModalShowCheckCate,
    setPostItemCheckCate,
    setPostCate,
    name_Old,
    department_Old,
  } = props;
  // console.log(department_Old?.d_id);
  const navigate = useNavigate();
  const [getDepartment, setGetDepartment] = useState<{}>({});

  const [nameCategory, setNameCategory] = useState<string>(name_Old);
  const [nameCategory_Old, setNameCategory_Old] = useState<string>(name_Old);

  const [departmentDId, setDepartmentDId] = useState<number>(0);
  const [departmentDId_Old, setDepartmentDId_Old] = useState<number>(
    department_Old?.d_id
  );

  const [boxCheck, setBoxCheck] = useState<any>(false);
  // console.log(boxCheck);

  useEffect(() => {
    let arrCheck = [];
    if (nameCategory !== nameCategory_Old && nameCategory) {
      arrCheck.push(true);
    } else {
      arrCheck.push(false);
    }
    if (departmentDId != departmentDId_Old && departmentDId) {
      arrCheck.push(true);
    } else {
      arrCheck.push(false);
    }
    // console.log("arrCheck = ", arrCheck);

    if (arrCheck[0] || arrCheck[1]) {
      setBoxCheck(true);
    } else {
      setBoxCheck(false);
    }
  }, [nameCategory, departmentDId]);

  useMemo(async () => {
    try {
      const resDpm = await axios(configAxios("get", `${API.getDepartment}`));
      setGetDepartment(resDpm.data);
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const department = _.filter(getDepartment, (item: any) => {
      return (
        item.d_id ==
        (departmentDId != departmentDId_Old && departmentDId != 0
          ? departmentDId
          : departmentDId_Old)
      );
    });
    //
    const obj = {
      name: nameCategory,
      department: department[0],
    };
    const dataform = {
      name: nameCategory != nameCategory_Old ? nameCategory : nameCategory_Old,
      departmentDId:
        departmentDId != departmentDId_Old && departmentDId != 0
          ? departmentDId
          : departmentDId_Old,
    };
    setPostItemCheckCate(obj);
    setPostCate(dataform);
    setModalShowCheckCate(true);
  };
  return (
    <Container style={{ borderRadius: 15, width: "100%", height: "100%" }}>
      <Form>
        {/* name */}
        <Form.Group className="mb-2">
          <Form.Label>ชื่อหมวดหมู่ครุภัณฑ์</Form.Label>
          <Form.Control
            size="lg"
            style={{
              borderColor:
                nameCategory_Old !== nameCategory && nameCategory
                  ? colors.borderColorEdit
                  : "",
            }}
            type="text"
            placeholder="หมวดหมู่ครุภัณฑ์"
            value={
              nameCategory === nameCategory_Old
                ? nameCategory_Old
                : nameCategory
            }
            onChange={(event: any) => {
              const name = event.target.value;
              setNameCategory(name);
            }}
          />
        </Form.Group>
        {/* Department */}
        <Form.Group className="mb-2" controlId="formFaculty">
          <Form.Label>
            สาขา ตอนนี้อยู่{" "}
            <span style={{ color: "#4c00ff", fontSize: 18 }}>
              ({department_Old?.nameTH + " " + department_Old?.nameEN})
            </span>
          </Form.Label>
          <Form.Select
            style={{
              borderColor:
                departmentDId_Old != departmentDId && departmentDId
                  ? colors.borderColorEdit
                  : "",
            }}
            onChange={(event: any) => {
              const value = event.target.value;
              setDepartmentDId(value);
            }}
            size="lg"
          >
            <option value={0}>กรุณาเลือกสาขา</option>
            {_.map(getDepartment, (item: any, idx) => {
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

export default FormEditCategory;
