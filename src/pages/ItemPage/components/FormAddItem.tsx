import { useState, useMemo, useEffect, useCallback } from "react";
import { Button, Form, Container, Toast } from "react-bootstrap";
import configAxios from "../../../axios/configAxios";
import { API } from "../../../axios/swr/endpoint";
import checkToken from "../../../config/checkToken";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { sweet_basic } from "../../../components/sweetalert2/sweet";
import {
  chackStatusItem,
  // chackStatusItemColor,
} from "../../../config/chackStatusItem";
// import images from "../../../config/index.images";
// import getBase64 from "../../../config/getBase64";
import { toLocaleStringEn } from "../../../config/number/formatEN";
import colors from "../../../config/colors";
import { IoMdHelpCircleOutline } from "react-icons/io";
import axios from "axios";
import { debounce } from "lodash";

function FormAddItem(props: any) {
  const {
    nameItem,
    setNameItem,
    codeItem,
    setCodeItem,
    setModalShowCheck,
    setPostItemCheck,
    setPostItem,
    setuserUrl,
  } = props;

  const navigate = useNavigate();
  const [getTypeItem, setGetTypeItem] = useState<{}>({});

  const [getFaculty, setGetFaculty] = useState<{}>({});
  const [getDepartment, setGetDepartment] = useState<{}>({});
  const [getBuilding, setGetBuilding] = useState<{}>({});
  const [getLocation, setGetLocation] = useState<{}>({});

  const [idFty, setIdFty] = useState<any>(0);
  const [idDpm, setIdDpm] = useState<any>(0);
  const [IdBud, setIdBul] = useState<any>(0);
  const [idLocat, setIdLocat] = useState<any>(0);
  const [idcate, setIdcate] = useState<any>(0);
  const [idType, setIdType] = useState<any>(0);
  //
  // useEffect(() => {
  //   console.log("..........................");
  //   console.log("idFty = ", idFty);
  //   console.log("idDpm = ", idDpm);
  //   console.log("IdBud = ", IdBud);
  //   console.log("idLocat = ", idLocat);
  //   console.log("idcate = ", idcate);
  //   console.log("idType = ", idType);
  // }, [idFty, idDpm, IdBud, idLocat, idcate, idType]);

  //
  const [status, setStatus] = useState<any>(1);
  const [nameCate, setNameCate] = useState<any>();

  const [description, setDescription] = useState<any>("");
  const [price, setPrice] = useState<any>(0);
  //

  const [codeSuggestions, setCodeSuggestions] = useState<string[]>([]);

  const debouncedFetchSuggestions = useCallback(
    debounce(async (code: string) => {
      if (code.length < 2) {
        setCodeSuggestions([]);
        setShowSuggestCode(false);
        return;
      }
      try {
        const response = await axios(
          configAxios("post", API.autoRecommendCode, { code })
        );
        setCodeSuggestions(response.data);
        if (response.data.length > 0) {
          setShowSuggestCode(true);
        } else {
          setShowSuggestCode(false);
        }
      } catch (error) {
        console.error("Error fetching code suggestions:", error);
        setCodeSuggestions([]);
      }
    }, 500),
    []
  );

  // getFaculty
  useMemo(async () => {
    try {
      const resFacu = await axios(configAxios("get", API.getFaculty));
      setGetFaculty(resFacu.data);
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);
  //
  useMemo(async () => {
    try {
      if (idFty != 0) {
        const res = await axios(
          configAxios("get", `${API.getDepartmentByFtyId}${idFty}`)
        );
        setGetDepartment(res.data);
      }
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, [idFty]);
  //  getDepartmentByFtyId
  //  setGetBuilding
  useMemo(async () => {
    try {
      if (idDpm != 0) {
        const res = await axios(
          configAxios("get", `${API.getBuildingByDpmId}${idDpm}`)
        );
        const resType = await axios(
          configAxios("get", `${API.getTypeItemByDpmId}${idDpm}`)
        );
        setGetTypeItem(resType.data);
        setGetBuilding(res.data);
      }
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, [idDpm]);
  //  getLocation
  useMemo(async () => {
    try {
      if (IdBud != 0) {
        const res = await axios(
          configAxios("get", `${API.getLocationByBud_Id}${IdBud}`)
        );
        setGetLocation(res.data);
      }
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, [IdBud]);

  const handleChangeFty = (event: any) => {
    const value = event.target.value;
    setIdFty(value);

    setIdDpm(0);
    setIdBul(0);
    setIdLocat(0);
  };

  const handleChangeDpm = (event: any) => {
    const value = event.target.value;
    setIdDpm(value);

    setIdType(0);
    setIdcate(0);
    setIdBul(0);
    setIdLocat(0);
  };

  const handleChangeBud = (event: any) => {
    const value = event.target.value;

    setIdBul(value);
    setIdLocat(0);
  };
  const handleChangeLocat = (event: any) => {
    const value = event.target.value;
    setIdLocat(value);
  };

  const handleChangeName = (event: any) => {
    const name = event.target.value;
    setNameItem(name);
  };

  const handleChangeCode = (event: any) => {
    const name = event.target.value;
    setCodeItem(name);
    debouncedFetchSuggestions(name);
  };

  const handleChangeStatus = (event: any) => {
    const status = event.target.value;
    setStatus(status);
  };

  const handleChangeType = (event?: any) => {
    const id = event.target.value;

    const typeItemById: any = _.filter(getTypeItem, (item: any) => {
      return item.type_id == id;
    });

    if (id != 0) {
      setNameCate(typeItemById[0].category.name);
      setIdcate(typeItemById[0].category.cate_id);
    } else {
      setNameCate(undefined);
    }

    setIdType(id);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setCodeItem(suggestion);
    setCodeSuggestions([]);
    toggleShowSuggestCode();
  };

  // Image
  const [selectedFile, setSelectedFile] = useState<any>();
  // const [showFile, setShowFile] = useState<any>();
  // console.log(selectedFile);
  // console.log("showFile = " + showFile);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    // console.log(chackStatusItem(status));
    let statusItemString = chackStatusItem(status);

    const obj = {
      name: nameItem,
      code: codeItem,
      status_item: {
        id: status,
        name: statusItemString,
      },
      description: description,
      price: price ? price : 0,
      faculty: {
        id: idFty,
        faculty: _.filter(getFaculty, (item: any) => {
          return item.f_id == idFty;
        }),
      },
      department: {
        id: idDpm,
        department: _.filter(getDepartment, (item: any) => {
          return item.d_id == idDpm;
        }),
      },
      building: {
        id: IdBud,
        building: _.filter(getBuilding, (item: any) => {
          return item.b_id == IdBud;
        }),
      },
      location: {
        id: idLocat,
        location: _.filter(getLocation, (item: any) => {
          return item.l_id == idLocat;
        }),
      },
      typeItemType: {
        id: idType,
        typeItem: _.filter(getTypeItem, (item: any) => {
          return item.type_id == idType;
        }),
      },
    };
    const data = {
      name: nameItem,
      code: codeItem,
      status_item: status,
      description: description,
      price: price ? price : 0,
      facultyFId: idFty,
      departmentDId: idDpm,
      buildingBId: IdBud,
      categoryCateId: idcate,
      locationLId: idLocat,
      typeItemTypeId: idType,
    };

    var dataform = new FormData();
    dataform.append("name", nameItem);
    dataform.append("code", codeItem);
    dataform.append("status_item", status);
    dataform.append("price", price ? price : 0);
    dataform.append("description", description);
    dataform.append("facultyFId", idFty);
    dataform.append("departmentDId", idDpm);
    dataform.append("buildingBId", IdBud);
    dataform.append("categoryCateId", idcate);
    dataform.append("locationLId", idLocat);
    dataform.append("typeItemTypeId", idType);
    dataform.append("images", selectedFile);

    //  TODO
    setPostItemCheck(obj);
    setuserUrl(selectedFile ? true : false);
    setPostItem(selectedFile ? dataform : data);
    setModalShowCheck(true);
  };

  const [getUserAdmin, setGetUserAdmin] = useState<boolean>(true);
  const [getProfile, setGetProfile] = useState<any>({});
  // console.log(getProfile);

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

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  const [showSuggestCode, setShowSuggestCode] = useState(false);
  const toggleShowSuggestCode = () => setShowSuggestCode(!showSuggestCode);

  return (
    <Container style={{ borderRadius: 15, width: "100%", height: "100%" }}>
      {/*  */}
      {/* <div className="d-flex justify-content-center mt-3">
        <img
          src={showFile ? showFile : images.upLoadImg}
          className="rounded float-right"
          width={200}
          height={200}
          style={{
            objectFit: "cover",
            borderRadius: 15,
            borderColor: "#ced4da",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        />
      </div> */}
      {/*  */}
      <Form>
        {/* <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>รูปครุภัณฑ์</Form.Label>
          <Form.Control
            accept="image/png,image/jpeg,image/jpg"
            placeholder="เลือกรูปภาพ"
            size="lg"
            type="file"
            onChange={(e: any) => {
              // console.log(e.target.files[0]);
              getBase64(e.target.files[0], (result: any) => {
                // console.log(result);
                setShowFile(result);
              });

              setSelectedFile(e.target.files[0]);
            }}
          />
        </Form.Group> */}

        <Form.Group className="mb-2" controlId="formNameItem">
          <Form.Label>ชื่อครุภัณฑ์</Form.Label>
          <Form.Control
            size="lg"
            // style={{ height: "3rem" }}
            type="text"
            placeholder="ชื่อ"
            value={nameItem}
            onChange={handleChangeName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCodeItem">
          <Form.Label>
            รหัสครุภัณฑ์{" "}
            <span style={{ color: colors.statusColor0ff }}>
              (<IoMdHelpCircleOutline size={15} color={colors.statusColor0ff} />{" "}
              กรณีรอหมายเลขครุภัณฑ์กรุณาใส่ " - " , " ไม่มี ")
            </span>
          </Form.Label>
          <Form.Control
            onClick={toggleShowA}
            size="lg"
            type="text"
            placeholder="Code"
            value={codeItem}
            onChange={handleChangeCode}
          />
        </Form.Group>
        <Toast show={showSuggestCode} className="mb-2" onClose={toggleShowSuggestCode}>
          <Toast.Header>
            <strong className="me-auto">
              รหัสครุภัณฑ์ที่คล้ายกัน
            </strong>
          </Toast.Header>
          <Toast.Body>
            <div className="d-flex flex-wrap">
             {_.map(codeSuggestions, (item: any, idx) => {
              return (
                <>
                  <div
                    key={idx}
                    className="suggestion-item"
                    onClick={() => handleSelectSuggestion(item)}
                  >
                    {item}
                  </div>
                </>
              )})}
            </div>
          </Toast.Body>
        </Toast>
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <strong className="me-auto">คำอัตโนมัติ</strong>
          </Toast.Header>
          <Toast.Body>
            <div className="d-flex justify-content-center flex-wrap">
              <Button
                onClick={() => {
                  setCodeItem("--");
                  toggleShowA();
                }}
                variant="outline-primary"
              >
                --
              </Button>{" "}
              <Button
                onClick={() => {
                  setCodeItem("ไม่มี");
                  toggleShowA();
                }}
                className="mx-2"
                variant="outline-primary"
              >
                ไม่มี
              </Button>{" "}
              <Button
                onClick={() => {
                  setCodeItem("รอหมายเลข");
                  toggleShowA();
                }}
                variant="outline-primary"
              >
                รอหมายเลข
              </Button>
            </div>
          </Toast.Body>
        </Toast>
        {/*  */}
        <Form.Group className="mb-3" controlId="formStatusItem">
          <Form.Label>สภานะครุภัณฑ์</Form.Label>
          <Form.Select
            // style={{ color: chackStatusItemColor(status) }}
            onChange={(event: any) => {
              handleChangeStatus(event);
            }}
            size="lg"
          >
            <option value="1">ปกติ</option>
            <option value="0">ชำรุด</option>
            <option value="2">รอจำหน่าย</option>
            <option value="3">จำหน่ายออก</option>
            {/* <option value="4">รอหมายเลขครุภัณฑ์</option> */}
          </Form.Select>
        </Form.Group>
        {/*  */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>รายละเอียดครุภัณฑ์</Form.Label>
          <Form.Control
            onChange={(event: any) => {
              const value = event.target.value;
              // console.log(value);
              // setDescription(value);
              setDescription(value);
              // if (description.length < 244) {
              //   console.log("ยัง 244 " + description.length);

              // } else {
              //   console.log(description.length);
              //   setDescription(value);
              // }
            }}
            value={description}
            size="lg"
            placeholder="สี/ขนาดจอ/ความสูง/ความกว้าง/ยี่ห้อ"
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCodeItem">
          <Form.Label>
            ราคาครุภัณฑ์ [
            <span style={{ fontSize: 20 }}>{toLocaleStringEn(price)}</span>]
          </Form.Label>
          <Form.Control
            size="lg"
            min={"0"}
            // style={{ height: "3rem" }}
            type="number"
            placeholder="ราคาครุภัณฑ์"
            value={price}
            onChange={(event: any) => {
              const value = event.target.value;
              setPrice(value);
            }}
          />
        </Form.Group>

        {/*  */}
        <Form.Group className="mb-3" controlId="formFaculty">
          <Form.Label>คณะ</Form.Label>
          <Form.Select
            value={idFty}
            onChange={(event: any) => {
              handleChangeFty(event);
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
                        {item.nameTH}
                      </option>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                <option value={0}>กรุณาเลือกคณะ</option>
                <option value={getProfile?.facultyFId}>
                  {getProfile?.faculty?.nameTH}
                </option>
              </>
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDepartment">
          <Form.Label>สาขา</Form.Label>
          <Form.Select
            value={idDpm}
            disabled={idFty == 0 ? true : false}
            style={{ backgroundColor: idFty != 0 ? "" : "#DCDCDC" }}
            onChange={(event: any) => {
              handleChangeDpm(event);
            }}
            size="lg"
          >
            {getUserAdmin ? (
              <>
                {idFty != 0 ? (
                  <option value={0}>กรุณาเลือกสาขา</option>
                ) : (
                  <>
                    <option value={0}>กรุณาเลือกคณะ</option>
                  </>
                )}
                {_.map(getDepartment, (item: any, idx) => {
                  return (
                    <>
                      <option key={item.d_id} value={item.d_id}>
                        {item.nameTH}
                      </option>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {idFty != 0 ? (
                  <>
                    <option value={0}>กรุณาเลือกสาขา</option>
                    <option value={getProfile?.departmentDId}>
                      {getProfile?.department?.nameTH}
                    </option>
                  </>
                ) : (
                  <>
                    <option value={0}>กรุณาเลือกคณะ</option>
                  </>
                )}
              </>
            )}
          </Form.Select>
        </Form.Group>
        {/*  */}

        <Form.Group className="mb-3" controlId="formBuilding">
          <Form.Label>อาคาร</Form.Label>
          <Form.Select
            value={IdBud}
            disabled={idDpm == 0 ? true : false}
            style={{ backgroundColor: idDpm != 0 ? "" : "#DCDCDC" }}
            onChange={(event: any) => {
              handleChangeBud(event);
            }}
            size="lg"
          >
            {idDpm != 0 ? (
              <option value={0}>กรุณาเลือกอาคาร</option>
            ) : (
              <option value={0}>กรุณาเลือกสาขา</option>
            )}

            {_.map(getBuilding, (item: any, idx) => {
              return (
                <>
                  <option key={item.b_id} value={item.b_id}>
                    {item.nameTH}
                  </option>
                </>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>สถานที่</Form.Label>
          <Form.Select
            value={idLocat}
            disabled={IdBud == 0 ? true : false}
            style={{ backgroundColor: IdBud != 0 ? "" : "#DCDCDC" }}
            onChange={(event: any) => {
              handleChangeLocat(event);
            }}
            size="lg"
          >
            {IdBud != 0 ? (
              <option value={0}>กรุณาเลือกสถานที่</option>
            ) : (
              <option value={0}>กรุณาเลือกอาคาร</option>
            )}

            {_.map(getLocation, (item: any, idx) => {
              return (
                <>
                  <option key={item.l_id} value={item.l_id}>
                    {item.nameTH} ชั้น {item.floor}
                  </option>
                </>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFaculty">
          <Form.Label>ชนิดครุภัณฑ์</Form.Label>
          <Form.Select
            onChange={(event: any) => {
              handleChangeType(event);
            }}
            size="lg"
          >
            <option value={0}>เลือกชนิดครุภัณฑ์</option>
            {_.map(getTypeItem, (item: any, idx) => {
              return (
                <>
                  <option key={item.type_id} value={item.type_id}>
                    {item.name}
                  </option>
                </>
              );
            })}
          </Form.Select>
        </Form.Group>
        {/*  */}
        <Form.Group className="mb-3">
          <Form.Label>หมวดหมู่ครุภัณฑ์ (อิงตามชนิดครุภัณฑ์)</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            placeholder={`${
              nameCate != undefined ? nameCate : "กรุณาเลือกชนิดครุภัณฑ์"
            }`}
            disabled
            readOnly
          />
        </Form.Group>

        {/*  */}
        <div className="d-flex justify-content-center">
          <Button
            // style={{}}
            onClick={(event) => {
              if (
                idFty != 0 &&
                idDpm != 0 &&
                IdBud != 0 &&
                idLocat != 0 &&
                idType != 0 &&
                nameItem &&
                codeItem &&
                description &&
                price >= 0 &&
                price
              ) {
                onSubmit(event);
              } else {
                event.preventDefault();
                sweet_basic("warning", "ข้อมูลไม่ครบ", "กรุณากรอกข้อมูลให้ครบ");
              }
            }}
            className="mb-3 mt-3 p-2"
            variant={
              idFty != 0 &&
              idDpm != 0 &&
              IdBud != 0 &&
              idLocat != 0 &&
              idType != 0 &&
              nameItem &&
              codeItem &&
              description &&
              price >= 0 &&
              price
                ? "success"
                : "secondary"
            }
            type="submit"
            size="lg"
          >
            {idFty != 0 &&
            idDpm != 0 &&
            IdBud != 0 &&
            idLocat != 0 &&
            idType != 0 &&
            nameItem &&
            codeItem &&
            description &&
            price >= 0 &&
            price
              ? "บันทึก"
              : "กรุณากรอกข้อมูลให้ครบ"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormAddItem;
