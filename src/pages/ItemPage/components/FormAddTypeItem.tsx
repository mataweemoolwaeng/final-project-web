import axios from "axios";
import { useState, useMemo } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import _ from "lodash";
import checkToken from "../../../config/checkToken";
import configAxios from "../../../axios/configAxios";
import { API } from "../../../axios/swr/endpoint";
import { useNavigate } from "react-router-dom";
// import dateFormat from "dateformat";
import { sweet_basic } from "../../../components/sweetalert2/sweet";
import { toLocaleStringEn } from "../../../config/number/formatEN";
import Moment from "react-moment";
function FormAddTypeItem(props: any) {
  const { setModalShowCheckType, setPostItemCheckType, setPostTypeItem } =
    props;
  const navigate = useNavigate();
  const [getDepartment, setGetDepartment] = useState<{}>({});
  const [getCategory, setGetCategory] = useState<{}>({});

  const [inputNameType, setInputNameType] = useState<string>();
  const [inputCode, setInputCode] = useState<string>();

  const [unitItemFN, setUnitItemFn] = useState<any>(0);
  // console.log("unitItemFN = " + unitItemFN);
  const [unitItem, setUnitItem] = useState<any>(0);
  // console.log("unitItem = " + unitItem);

  const [inputUnitItem, setInputUnitItem] = useState<any>("");
  // console.log("inputUnitItem = " + inputUnitItem);

  const [quantity, setQuantity] = useState<number>(0);
  const [priceUnit, setPriceUnit] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();

  const [idDpm, setIdDpm] = useState<number>(0);
  // console.log("idDpm = " + idDpm);
  const [idcate, setIdcate] = useState<number>(0);
  // console.log("idcate = " + idcate);
  const [startDate, setStartDate] = useState<any>();

  // const [nowstartDate, setNowStartDate] = useState<any>(new Date());

  //  getDepartmentByFtyId
  useMemo(async () => {
    try {
      const resDpm = await axios(configAxios("get", `${API.getDepartment}`));
      setGetDepartment(resDpm.data);
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);
  //
  useMemo(async () => {
    try {
      const resCategory = await axios(
        configAxios("get", `${API.getCategoryByDpm_Id}${idDpm}`)
      );
      setGetCategory(resCategory.data);
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, [idDpm]);

  useMemo(async () => {
    if (
      unitItem == 0 ||
      inputUnitItem == "" ||
      unitItem == -1 ||
      inputUnitItem == ""
    ) {
      // console.log("W20");

      setUnitItemFn(0);
    } else {
      setUnitItemFn(1);
    }
  }, [unitItem]);

  useMemo(async () => {
    if (unitItem == -1 && inputUnitItem == "") {
      setUnitItemFn(0);
    } else {
      if (unitItem == 0) {
        setUnitItemFn(0);
      } else {
        setUnitItemFn(1);
      }
    }
  }, [inputUnitItem, unitItem]);

  const handleChangeUnit = (event: any) => {
    const value = event.target.value;
    if (value == 0) {
      setUnitItem(0);
    } else {
      setUnitItem(value);
    }
  };
  const handleChangeQty = (event: any) => {
    const value = event.target.value;
    setQuantity(value);

    if (priceUnit != undefined) {
      setPriceUnit(0);
    }
    if (totalPrice != undefined) {
      setTotalPrice(0);
    }
  };
  const handleChangePUT = (event: any) => {
    const value = event.target.value;
    setPriceUnit(value);
    setTotalPrice(value * quantity);
  };
  const handleChangeTp = (event: any) => {
    const value = event.target.value;
    setTotalPrice(value);
    setPriceUnit(value / quantity);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    // console.log(startDate);
    const obj = {
      name: inputNameType,
      code: inputCode,
      quantity: quantity,
      unit: unitItem != 0 && unitItem != -1 ? unitItem : inputUnitItem,
      price_unit: priceUnit,
      total_price: totalPrice,
      purchase_date: startDate,
      department: {
        id: idDpm,
        department: _.filter(getDepartment, (item: any) => {
          return item.d_id == idDpm;
        }),
      },
      category: {
        id: idcate,
        category: _.filter(getCategory, (item: any) => {
          return item.cate_id == idcate;
        }),
      },
    };
    setPostItemCheckType(obj);
    const dataform = {
      name: inputNameType,
      code: inputCode,
      quantity: quantity,
      unit: inputUnitItem != "" ? inputUnitItem : unitItem,
      price_unit: priceUnit,
      total_price: totalPrice,
      purchase_date: startDate,
      departmentDId: idDpm,
      categoryCateId: idcate,
    };
    // console.log(dataform);
    setPostTypeItem(dataform);
    setModalShowCheckType(true);
  };

  return (
    <Container style={{ borderRadius: 15, width: "100%", height: "100%" }}>
      <Form>
        {/* name */}
        <Form.Group className="mb-2" controlId="formNameItem">
          <Form.Label>ชื่อชนิดครุภัณฑ์</Form.Label>
          <Form.Control
            size="lg"
            // style={{ height: "3rem" }}
            type="text"
            placeholder="ชื่อชนิดครุภัณฑ์"
            value={inputNameType}
            onChange={(event: any) => {
              const value = event.target.value;
              setInputNameType(value);
            }}
          />
        </Form.Group>
        {/* code */}
        <Form.Group className="mb-2" controlId="formNameItem">
          <Form.Label>รหัสชนิดครุภัณฑ์</Form.Label>
          <Form.Control
            size="lg"
            // style={{ height: "3rem" }}
            type="text"
            placeholder="Code"
            value={inputCode}
            onChange={(event: any) => {
              const value = event.target.value;
              setInputCode(value);
            }}
          />
        </Form.Group>
        {/*  */}
        <Row className="mb-2">
          {/* quantity */}
          <Form.Group as={Col} controlId="formQuantity">
            <Form.Label>
              จำนวน/หน่วยนับ [
              <span style={{ fontSize: 20 }}>{toLocaleStringEn(quantity)}</span>
              ]
            </Form.Label>
            <Form.Control
              onChange={handleChangeQty}
              size="lg"
              type="number"
              placeholder="จำนวน"
            />
          </Form.Group>
          {unitItem == -1 && (
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>หน่วยนับอื่นๆ</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="ชุด / เครื่อง / แผง / ตัว ..."
                //value={inputUnitItem}
                onChange={(event: any) => {
                  const value = event.target.value;
                  setInputUnitItem(value);
                }}
              />
            </Form.Group>
          )}
          <Form.Group as={Col} controlId="formUnit">
            {/* unit */}
            <Form.Label>หน่วยนับ</Form.Label>
            <Form.Select
              onChange={(event: any) => {
                handleChangeUnit(event);
              }}
              size="lg"
            >
              <option value="0">เลือกหน่วยนับ</option>
              <option>ตู้</option>
              <option>ชุด</option>
              <option>ตัว</option>
              <option>แผง</option>
              <option>เครื่อง</option>
              <option value="-1">อื่นๆ</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-2">
          {/* price_unit */}
          <Form.Group as={Col} controlId="formQuantity">
            <Form.Label>
              ราคาต่อหน่วย [
              <span style={{}}>{toLocaleStringEn(priceUnit)}</span>]
            </Form.Label>
            <Form.Control
              onChange={handleChangePUT}
              value={priceUnit}
              size="lg"
              type="number"
              placeholder="ราคา"
            />
          </Form.Group>
          {/* total_price */}
          <Form.Group as={Col} controlId="formQuantity">
            <Form.Label>
              ราคารวม [<span style={{}}>{toLocaleStringEn(totalPrice)}</span>]
            </Form.Label>
            <Form.Control
              size="lg"
              type="number"
              // disabled={priceUnit != 0 ? true : false}
              // readOnly={priceUnit != 0 ? true : false}
              placeholder="ราคารวม"
              value={totalPrice}
              onChange={handleChangeTp}
            />
          </Form.Group>
        </Row>

        {/* Department */}
        <Form.Group className="mb-2" controlId="formFaculty">
          <Form.Label>สาขา</Form.Label>
          <Form.Select
            onChange={(event: any) => {
              const value = event.target.value;
              setIdDpm(value);
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

        {/* Category */}
        <Form.Group className="mb-2" controlId="formFaculty">
          <Form.Label>หมวดหมู่ครุภัณฑ์</Form.Label>
          <Form.Select
            onChange={(event: any) => {
              const value = event.target.value;
              setIdcate(value);
            }}
            size="lg"
          >
            <option value={0}>กรุณาเลือกหมวดหมู่ครุภัณฑ์</option>
            {_.map(getCategory, (item: any, idx) => {
              return (
                <>
                  <option key={item.cate_id} value={item.cate_id}>
                    {item.name}
                  </option>
                </>
              );
            })}
          </Form.Select>
          {/*  */}
        </Form.Group>

        <Row className="mb-2">
          <Form.Group as={Col} className="mb-2" controlId="formFaculty">
            <Form.Label>
              วันที่ซื้อ [
              <span style={{ fontSize: 20 }}>
                {startDate && <Moment format="DD/MM/YYYY">{startDate}</Moment>}
              </span>
              ]
            </Form.Label>
            <Form.Control
              // value={startDate}
              onChange={(e: any) => {
                const now = new Date(e.target.value);
                setStartDate(now);
              }}
              //value={startDate}
              size="lg"
              type="date"
              placeholder="เลือกวัน"
            />
          </Form.Group>

          <Form.Group as={Col} className="mb-2 mt-2" controlId="formFaculty">
            <Form.Label></Form.Label>
            <Form.Control
              placeholder=""
              size="lg"
              type="text"
              disabled
              readOnly
            />
          </Form.Group>
        </Row>

        {/*  */}

        <div className="d-flex justify-content-center">
          <Button
            // style={{}}
            onClick={(event) => {
              if (
                inputNameType &&
                inputCode &&
                unitItemFN != 0 &&
                quantity != 0 &&
                priceUnit != 0 &&
                totalPrice != 0 &&
                idDpm &&
                idcate &&
                startDate
              ) {
                onSubmit(event);
              } else {
                event.preventDefault();
                sweet_basic("warning", "ข้อมูลไม่ครบ", "กรุณากรอกข้อมูลให้ครบ");
              }
            }}
            className="mb-3 mt-3 p-2"
            variant={
              inputNameType &&
              inputCode &&
              unitItemFN != 0 &&
              quantity != 0 &&
              priceUnit != 0 &&
              totalPrice != 0 &&
              idDpm &&
              idcate &&
              startDate
                ? "success"
                : "secondary"
            }
            type="submit"
            size="lg"
          >
            {inputNameType &&
            inputCode &&
            unitItemFN != 0 &&
            quantity != 0 &&
            priceUnit != 0 &&
            totalPrice != 0 &&
            idDpm &&
            idcate &&
            startDate
              ? "บันทึก"
              : "กรุณากรอกข้อมูลให้ครบ"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormAddTypeItem;
