import { useState, useMemo } from "react";
import _ from "lodash";
import { Button, Form, Container } from "react-bootstrap";
import { sweet_basic } from "../../../components/sweetalert2/sweet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configAxios from "../../../axios/configAxios";
import { API } from "../../../axios/swr/endpoint";
import checkToken from "../../../config/checkToken";

function FormAddCateItem(props: any) {
  const navigate = useNavigate();
  const { setModalShowCheckCate, setPostItemCheckCate, setPostCate } = props;
  const [nameCategory, setNameCategory] = useState<string>();
  const [getDepartment, setGetDepartment] = useState<{}>({});
  const [departmentDId, setDepartmentDId] = useState<number>(0);
  //  getDepartmentByFtyId
  useMemo(async () => {
    try {
      const resDpm = await axios(configAxios("get", `${API.getDepartment}`));
      setGetDepartment(resDpm.data);
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);

  const handleChangeName = (event: any) => {
    const name = event.target.value;
    setNameCategory(name);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const department = _.filter(getDepartment, (item: any) => {
      return item.d_id == departmentDId;
    });
    //
    const obj = {
      name: nameCategory,
      department: department[0],
    };
    const dataform = {
      name: nameCategory,
      departmentDId: departmentDId,
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
            // style={{ height: "3rem" }}
            type="text"
            placeholder="หมวดหมู่ครุภัณฑ์"
            value={nameCategory}
            onChange={handleChangeName}
          />
        </Form.Group>
        {/* Department */}
        <Form.Group className="mb-2" controlId="formFaculty">
          <Form.Label>สาขา</Form.Label>
          <Form.Select
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
                    {item.nameTH}
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
              if (nameCategory && departmentDId) {
                onSubmit(event);
              } else {
                event.preventDefault();
                sweet_basic("warning", "ข้อมูลไม่ครบ", "กรุณากรอกข้อมูลให้ครบ");
              }
            }}
            className="mb-3 mt-3 p-2"
            variant={nameCategory && departmentDId ? "success" : "secondary"}
            type="submit"
            size="lg"
          >
            {nameCategory && departmentDId ? "บันทึก" : "กรุณากรอกข้อมูลให้ครบ"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormAddCateItem;
