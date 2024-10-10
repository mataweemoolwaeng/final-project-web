import { useState, useMemo, useEffect } from "react";
import _ from "lodash";
import {
  Button,
  Form,
  Container,
  ToggleButton,
  ButtonGroup,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import configAxios from "../../../../axios/configAxios";
import { API } from "../../../../axios/swr/endpoint";
import checkToken from "../../../../config/checkToken";
import { useNavigate } from "react-router-dom";
import { sweet_basic } from "../../../../components/sweetalert2/sweet";
import images from "../../../../config/index.images";
import { setURLProfile } from "../../../../config/setURL_image";
import getBase64 from "../../../../config/getBase64";

function FormEditUser(props: any) {
  const {
    setModalShowCheckUser,
    setPostUser,
    setPostUserCheck,
    user_Old,
    setuserUrl,
  } = props;
  // console.log(user_Old);

  const navigate = useNavigate();
  const nameImage_delete = user_Old?.name_image;
  // console.log(nameImage_delete);

  const [getFaculty, setGetFaculty] = useState<{}>({});
  const [getDepartment, setGetDepartment] = useState<{}>({});

  const [username, setUsername] = useState<any>(user_Old?.user?.username);
  const [username_Old, setUsername_Old] = useState<any>(
    user_Old?.user?.username
  );
  //
  const [password, setPassword] = useState<any>();
  const [checkPassword, setCheckPassword] = useState<any>();
  //
  const [firstname, setFirstname] = useState<any>(user_Old?.firstname);
  const [firstname_Old, setFirstname_Old] = useState<any>(user_Old?.firstname);
  //
  const [lastname, setLastname] = useState<any>(user_Old?.lastname);
  const [lastname_Old, setLastname_Old] = useState<any>(user_Old?.lastname);
  //
  const [nickname, setNickname] = useState<any>(user_Old?.nickname);
  const [nickname_Old, setNickname_Old] = useState<any>(user_Old?.nickname);
  //
  const [telephone, setTelephone] = useState<any>(user_Old?.telephone);
  const [telephone_Old, setTelephone_Old] = useState<any>(user_Old?.telephone);
  //
  const [email, setEmail] = useState<any>(user_Old?.email);
  const [email_Old, setEmail_Old] = useState<any>(user_Old?.email);

  // nameImage_delete
  //
  const [radioValue, setRadioValue] = useState(
    user_Old?.user?.admin ? "1" : "0"
  );
  //
  const [facultyFId, setFacultyFId] = useState<any>(0);
  const [facultyFId_Old, setFacultyFId_Old] = useState<any>(0);
  //
  const [departmentDId, setDepartmentDId] = useState<any>(0);
  const [departmentDId_Old, setDepartmentDId_Old] = useState<any>(0);
  // const [admin, setAdmin] = useState<boolean>();

  useMemo(async () => {
    try {
      const resFacu = await axios(configAxios("get", API.getFaculty));
      setGetFaculty(resFacu.data);
      //
      if (user_Old?.name_image) {
        const urlProfile = setURLProfile(user_Old?.name_image);
        setShowImage(urlProfile);
      }
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);
  //  getDepartmentByfacultyFId
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

  const radios = [
    { name: "Admin", value: "1" },
    { name: "User", value: "0" },
  ];

  // Image
  const [selectedFile, setSelectedFile] = useState<any>();

  // console.log(selectedFile);
  //
  const [showFile, setShowFile] = useState<any>();
  const [showImage, setShowImage] = useState<any>();
  // console.log(selectedFile);
  // console.log("showFile = " + showFile);
  // console.log("showImage = " + showFile);

  // useEffect(() => {}, [showFile]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const obj = {
      username: username,
      password: password,
      admin: radioValue == "1" ? true : false,
      firstname: firstname,
      lastname: lastname,
      nickname: nickname,
      telephone: telephone,
      email: email,
      faculty: _.filter(getFaculty, (item: any) => {
        return item.f_id == facultyFId;
      }),
      department: _.filter(getDepartment, (item: any) => {
        return item.d_id == departmentDId;
      }),
    };
    const data = {
      username: username,
      password: password,
      admin: radioValue == "1" ? true : false,
      firstname: firstname,
      lastname: lastname,
      nickname: nickname,
      telephone: telephone,
      email: email,
      facultyFId: facultyFId,
      departmentDId: departmentDId,
    };

    var dataform = new FormData();
    dataform.append("username", username);
    dataform.append("password", password);
    dataform.append("admin", radioValue);
    dataform.append("firstname", firstname);
    dataform.append("lastname", lastname);
    dataform.append("nickname", nickname);
    dataform.append("telephone", telephone);
    dataform.append("email", email);
    dataform.append("facultyFId", facultyFId);
    dataform.append("departmentDId", departmentDId);
    dataform.append("nameImage_delete", nameImage_delete);
    dataform.append("images", selectedFile);
    // 
    setPostUserCheck(obj);
    setuserUrl(selectedFile ? true : false);
    setPostUser(selectedFile ? dataform : data);
    setModalShowCheckUser(true);
  };

  return (
    <>
      <Container style={{ borderRadius: 15, width: "100%", height: "100%" }}>
        <div className="d-flex justify-content-center">
          <img
            src={showFile ? showFile : showImage ? showImage : images.upLoadImg}
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
        </div>
        <Form>
          {/*  */}
          <div className="d-flex align-items-center justify-content-center">
            <div>
              <Form.Group controlId="formFile" className="mb-3 ">
                <Form.Label></Form.Label>
                <Form.Control
                  // value={}
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
                    // console.log(e.target.files[0].name);
                    setSelectedFile(e.target.files[0]);
                  }}
                />
              </Form.Group>
            </div>
          </div>

          {/* name */}
          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Username"
              value={username === username_Old ? username_Old : username}
              onChange={(event) => {
                const eUsername = event.target.value;
                setUsername(eUsername);
              }}
            />
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => {
                const ePassword = event.target.value;
                setPassword(ePassword);
              }}
            />
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-2">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              style={{
                borderColor: checkPassword
                  ? password != checkPassword
                    ? "red"
                    : "green"
                  : "",
              }}
              size="lg"
              type="password"
              placeholder="Password Confirmation"
              value={checkPassword}
              onChange={(event) => {
                const echeckPassword = event.target.value;
                setCheckPassword(echeckPassword);
              }}
            />
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-2">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Firstname"
              value={firstname === firstname_Old ? firstname_Old : firstname}
              onChange={(event) => {
                const eFirstname = event.target.value;
                setFirstname(eFirstname);
              }}
            />
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-2">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Lastname"
              value={lastname === lastname_Old ? lastname_Old : lastname}
              onChange={(event) => {
                const eLastname = event.target.value;
                setLastname(eLastname);
              }}
            />
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-2">
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Nickname"
              value={nickname === nickname_Old ? nickname_Old : nickname}
              onChange={(event) => {
                const eNickname = event.target.value;
                setNickname(eNickname);
              }}
            />
          </Form.Group>

          {/*  */}
          <Form.Group className="mb-2">
            <Form.Label>Telephone</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Telephone"
              value={telephone === telephone_Old ? telephone_Old : telephone}
              onChange={(event) => {
                const eTelephone = event.target.value;
                setTelephone(eTelephone);
              }}
            />
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              placeholder="Email"
              value={email === email_Old ? email_Old : email}
              onChange={(event) => {
                const eEmail = event.target.value;
                setEmail(eEmail);
              }}
            />
          </Form.Group>

          {/*  */}
          <Form.Group className="mb-1">
            <Form.Label>เลือก Roles</Form.Label>
          </Form.Group>
          <ButtonGroup className="mb-2">
            {radios.map((radio, idx) => (
              <ToggleButton
                size="lg"
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={"outline-dark"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          {/*  */}
          {/*  */}
          <Form.Group className="mb-3" controlId="formFaculty">
            <Form.Label>
              เลือกคณะ ตอนนี้อยู่{" "}
              <span style={{ color: "#4c00ff", fontSize: 18 }}>
                (
                {user_Old?.faculty?.nameTH == undefined
                  ? "ยังไม่ได้เลือก"
                  : user_Old?.faculty?.nameTH + " " + user_Old?.faculty?.nameEN}
                )
              </span>
            </Form.Label>
            <Form.Select
              onChange={(event: any) => {
                const eFacultyFId = event.target.value;
                setFacultyFId(eFacultyFId);
              }}
              size="lg"
            >
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
            </Form.Select>
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-3" controlId="formDepartment">
            <Form.Label>
              เลือกสาขา ตอนนี้อยู่{" "}
              <span style={{ color: "#4c00ff", fontSize: 18 }}>
                (
                {user_Old?.department?.nameTH == undefined
                  ? "ยังไม่ได้เลือก"
                  : user_Old?.department?.nameTH +
                    " " +
                    user_Old?.department?.nameEN}
                )
              </span>
            </Form.Label>
            <Form.Select
              disabled={facultyFId == 0 ? true : false}
              onChange={(event: any) => {
                const eDepartmentDId = event.target.value;
                setDepartmentDId(eDepartmentDId);
              }}
              size="lg"
            >
              {facultyFId != 0 ? (
                <option value={0}>กรุณาเลือกสาขา</option>
              ) : (
                <option value={0}>กรุณาเลือกคณะ</option>
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
            </Form.Select>
          </Form.Group>

          {/*  */}
          <div className="d-flex justify-content-center">
            <Button
              // style={{}}
              onClick={(event) => {
                if (
                  username &&
                  password === checkPassword &&
                  firstname &&
                  lastname &&
                  nickname &&
                  telephone &&
                  email &&
                  radioValue != "" &&
                  facultyFId != 0 &&
                  departmentDId != 0
                ) {
                  onSubmit(event);
                } else {
                  event.preventDefault();
                  sweet_basic(
                    "warning",
                    "ข้อมูลไม่ครบ",
                    "กรุณากรอกข้อมูลให้ครบ"
                  );
                }
              }}
              className="mb-3 mt-3 p-2"
              variant={
                username &&
                password === checkPassword &&
                firstname &&
                lastname &&
                nickname &&
                telephone &&
                email &&
                radioValue != "" &&
                facultyFId != 0 &&
                departmentDId != 0
                  ? "success"
                  : "secondary"
              }
              type="submit"
              size="lg"
            >
              {username &&
              password === checkPassword &&
              firstname &&
              lastname &&
              nickname &&
              telephone &&
              email &&
              radioValue != "" &&
              facultyFId != 0 &&
              departmentDId != 0
                ? "Submit"
                : "กรุณากรอกข้อมูลให้ครบ"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default FormEditUser;
