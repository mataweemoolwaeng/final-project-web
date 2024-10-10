import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GetKanitFont } from "../../../config/fonts";
import FormInput from "./components/FormInput";
import NavbarTopLogin from "../../../components/navbar/NavbarTopLogin";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
// import { sweet_popUpTimer } from "../../../components/sweetalert2/sweet";
import axios from "axios";
import configAxios from "../../../axios/configAxios";
// import checkToken from "../../../config/checkToken";
import { API } from "../../../axios/swr/endpoint";
import images from "../../../config/index.images";
import _ from "lodash";
function Login() {
  const navigate = useNavigate();

  const setlocalStorage = async (
    token: string,
    user: string,
    profile?: object
  ) => {
    localStorage.setItem("Token", token);
    localStorage.setItem("UserAdmin", user);
    localStorage.setItem("Profile", JSON.stringify(profile));
  };

  useMemo(async () => {
    const getToken = localStorage.getItem("Token");
    if (getToken) {
      try {
        const res = await axios(configAxios("get", API.checkToken));
        // console.log(res);
        if (res.status == 200) {
          // if
          setTimeout(() => {
            navigate("/dashboard");
          }, 100);
        }
      } catch (error: any) {
        // console.log("err = ", error.request.status);
      }
      //   navigate(-1);
    } else {
    }
  }, []);
  const imgPage = [images.loginPage1, images.loginPage2];

  // const Fullscreen = styled.div`
  //   /* display: flex; */
  //   /* background: #fdfd no-repeat; */
  //   /* -webkit-background-size: cover; */
  //   /* background-size: cover; */
  //   /* width: auto; */
  //   /* height: 50vh; */
  // `;
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <NavbarTopLogin />
      <Container style={{ ...GetKanitFont("KanitLight") }}>
        <div className="d-flex justify-content-center flex-column align-items-center mb-3">
          <div>
            <h2 className="mt-3">Assets Management System RMUTI KKC</h2>
          </div>
          <div>
            <span>
              ระบบจัดการครุภัณฑ์สำหรับมหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
              วิทยาเขตขอนแก่น.
            </span>
          </div>
        </div>
        <Row>
          <Col sm={8} style={{ backgroundColor: "#fcfcfc" }}>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {_.map(imgPage, (item, idx) => {
                return (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100 h-100"
                      src={item}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Col>
          <Col sm={4} className="">
            <div className=" d-flex justify-content-center flex-column align-items-center">
              <FormInput
                navigate={navigate}
                setlocalStorage={setlocalStorage}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
