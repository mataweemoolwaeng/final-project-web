import { useState } from "react";
import NavbarItem from "../../components/navbar/NavbarItem";
import NavbarTop from "../../components/navbar/NavbarTop";
import { GetKanitFont } from "../../config/fonts";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import images from "../../config/index.images";
import _ from "lodash";
// import { GrAndroid } from "react-icons/gr";
import { FaAndroid } from "react-icons/fa";
// import { sweet_basic } from "../../components/sweetalert2/sweet";
// import env from "react-dotenv";
import ModalDownload from "./components/ModalDownload";
function ApplicationDownload() {
  const [modalShowModalDownload, setModalShowModalDownload] = useState(false);
  const [index, setIndex] = useState(0);

  //  console.log(modalShowModalDownload);

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };

  const arrListImages = [
    images.mobileLogin,
    images.mobileHome,
    images.mobileDetail,
    images.mobileScan,
    images.mobileScanBf,
    images.mobileStatus,
    images.mobileLocate,
    images.mobileScss,
  ];

  // Function will execute on click of button
  const onButtonClick = async () => {
    // using Java Script method to get PDF file
    setModalShowModalDownload(true);
    await fetch("app-assetsKKC.apk").then((response) => {
      response
        .blob()
        .then((blob) => {
          // Creating new object of PDF file
          const fileURL = window.URL.createObjectURL(blob);
          // Setting various property values
          let alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = "app-assetsKKC.apk";
          alink.click();
        })
        .finally(() => {
          setTimeout(() => {
            setModalShowModalDownload(false);
          }, 5000);
        });
    });
    // sweet_basic(
    //   "warning",
    //   "ยังไม่สามารถดาวน์โหลดแอปพลิเคชันได้",
    //   `ขออภัย (version ${env.REACT_APP_VERSION}) BETA ยังไม่สามารถดาวน์โหลดแอปพลิเคชันได้`
    // );
  };
  return (
    <>
      <div style={{ ...GetKanitFont("KanitLight") }}>
        <NavbarTop />
        <NavbarItem clickPage={"download"} />
        {modalShowModalDownload && (
          <ModalDownload
            show={modalShowModalDownload}
            onHide={() => setModalShowModalDownload(false)}
            isPage={"app"}
          />
        )}
        <div>
          <Container>
            <Row className="mt-5">
              <Col style={{}} sm={8}>
                <div
                  className="mt-5 mb-3"
                  style={{ fontSize: 36, textAlign: "center" }}
                >
                  <span style={{ ...GetKanitFont("KanitMedium") }}>
                    ดาวน์โหลดแอปพลิเคชัน
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 30,
                    textAlign: "center",
                  }}
                >
                  จัดการครุภัณฑ์บนระบบปฏิบัติการแอนดรอยด์
                </div>
                <div
                  style={{
                    fontSize: 26,
                    textAlign: "center",
                  }}
                >
                  Application Assets Management System RMUTI KKC
                </div>
                <div className="d-flex justify-content-center mt-5">
                  <Button
                    onClick={onButtonClick}
                    style={{ backgroundColor: "#000", padding: 10 }}
                  >
                    <FaAndroid color={"#fff"} size={30} /> Download on the
                    Android(.apk)
                  </Button>
                </div>
              </Col>
              <Col sm={4}>
                <Carousel
                  className="p-5"
                  variant="dark"
                  activeIndex={index}
                  onSelect={handleSelect}
                >
                  {_.map(arrListImages, (item: any, idx: any) => {
                    return (
                      <Carousel.Item key={idx}>
                        <img
                          className="d-block w-100 h-100"
                          src={item}
                          alt="First slide"
                        />
                        {/* <Carousel.Caption></Carousel.Caption> */}
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ApplicationDownload;
