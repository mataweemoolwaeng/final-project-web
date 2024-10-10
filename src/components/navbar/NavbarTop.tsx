import { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import styled from "styled-components";
import colors from "../../config/colors";
import { useNavigate } from "react-router-dom";
import { sweet_confirm } from "../sweetalert2/sweet";
import { GetKanitFont } from "../../config/fonts";
import icons from "../../config/icons";

function NavbarTop(props: any) {
  const navigate = useNavigate();

  const navigatePage = (page: string, idItem?: any) => {
    navigate(page);
  };
  const [getUserAdmin, setGetUserAdmin] = useState<boolean>(false);
  // console.log("getUserAdmin = ", getUserAdmin);
  const [getProfile, setGetProfile] = useState<any>({});
  const [isLogOut, setisLogOut] = useState<boolean>(false);

  useEffect(() => {
    let userAdmin: any = localStorage.getItem("UserAdmin");
    if (userAdmin == "true") {
      setGetUserAdmin(true);
    } else {
      setGetUserAdmin(false);
    }
    let profile: any = localStorage.getItem("Profile");
    profile = JSON.parse(profile);
    setGetProfile(profile);
  }, []);

  useEffect(() => {
    if (isLogOut) {
      navigate("/login");
      // localStorage.removeItem("Token");
      // localStorage.removeItem("Profile");
      // localStorage.removeItem("UserAdmin");
      localStorage.clear();
    }
  }, [isLogOut]);

  const { clickPage } = props;
  // console.log(clickPage);

  const TitleAdmin = styled.span`
    color: ${(props: any) =>
      props.color === "admin" ? colors.goldFC : "dark"};
  `;
  const styles = {
    fontNavLink: {
      fontSize: 20,
    },
    fontNavDropdown: {
      fontSize: 22,
    },
  };

  return (
    <Navbar
      collapseOnSelect
      bg="light"
      expand="lg"
      style={{ ...GetKanitFont("KanitLight") }}
    >
      <Container>
        <Navbar.Brand
          href={clickPage == "dashboard" ? "" : "#"}
          onClick={() => {
            if (clickPage != "dashboard") navigatePage("/dashboard");
          }}
        >
          <img
            src={icons.RMUTI_kkc}
            width="100%"
            height="100%"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Nav>
            <NavDropdown
              style={styles.fontNavLink}
              title={
                <TitleAdmin color={clickPage}>
                  {getProfile?.firstname}{" "}
                  <span style={{color : colors.goldFC}}>{getUserAdmin ? "[Admin]" : ""}</span>
                </TitleAdmin>
              }
            >
              <NavDropdown.Item
                style={styles.fontNavLink}
                onClick={() => {
                  navigatePage("/profile");
                }}
              >
                ข้อมูลส่วนตัว
              </NavDropdown.Item>
              {/*  */}
              {/* {getUserAdmin && (
                <NavDropdown.Item
                  style={styles.fontNavLink}
                  onClick={() => {
                    navigatePage("/admin");
                  }}
                >
                  จัดการผู้ใช้งาน
                </NavDropdown.Item>
              )} */}
              <NavDropdown.Item
                style={styles.fontNavLink}
                onClick={async () => {
                  const logOut = await sweet_confirm(
                    "warning",
                    "ออกจากระบบ",
                    "คุณต้องการออกจากระบบใช่หรือไม่",
                    "ใช่",
                    "ไม่",
                    undefined,
                    undefined,
                    "ออกจากระบบเสร็จสิ้น",
                    "ระบบกำลังนำทาง",
                    setisLogOut
                  );
                }}
              >
                ออกจากระบบ
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
