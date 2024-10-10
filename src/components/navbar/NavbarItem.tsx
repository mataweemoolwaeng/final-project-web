import { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../config/colors";
// import { FiSettings } from "react-icons/fi";
import pathRoutesPage from "../../router/pathPage";

function NavbarItem(props: any) {
  const navigate = useNavigate();
  const { clickPage } = props;
  const [getUserAdmin, setGetUserAdmin] = useState<boolean>(false);
  const [getProfile, setGetProfile] = useState<any>({});
  const navigatePage = (page: string, idItem?: any) => {
    navigate(page);
  };
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
  const TitleDashboard = styled.span`
    color: ${(props: any) =>
      props.color === "dashboard" ? colors.goldFC : colors.white};
  `;
  const EditUser = styled.span`
    color: ${(props: any) =>
      props.color === "editUser" ? colors.goldFC : colors.white};
  `;
  const TitleItem = styled.span`
    color: ${(props: any) =>
      props.color === "items" ? colors.goldFC : colors.white};
  `;
  const TitleSetting = styled.span`
    color: ${(props: any) =>
      props.color === "setting" ? colors.goldFC : colors.white};
  `;
  const TitleDownload = styled.span`
    color: ${(props: any) =>
      props.color === "download" ? colors.goldFC : colors.white};
  `;

  const styles = {
    fontNavBrand: {
      fontSize: 35,
    },
    fontNavLink: {
      fontSize: 20,
    },
    fontNavDropdown: {
      fontSize: 22,
      marginLeft: 15,
      marginRight: 15,
    },
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/*  */}
          <Nav
            className=""
            // style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              onClick={() => {
                navigatePage(pathRoutesPage.Dashboard);
              }}
              style={styles.fontNavLink}
            >
              <TitleDashboard color={clickPage}>Dashboard</TitleDashboard>
            </Nav.Link>
            {/*  */}
            {/*  */}

            {/*  */}

            {/*  */}
            {/* <Nav.Link
              onClick={() => {
                navigatePage("/items");
              }}
              style={styles.fontNavLink}
            >
              <TitleItem color={clickPage}>รายการครุภัณฑ์ทั้งหมด</TitleItem>
            </Nav.Link> */}
            {/*  */}
          </Nav>
          <Nav>
            <NavDropdown
              style={styles.fontNavDropdown}
              title={<TitleItem color={clickPage}>ครุภัณฑ์</TitleItem>}
              id="navbarScrollingDropdown"
            >
              {/*  */}
              <NavDropdown.Item
                style={styles.fontNavLink}
                onClick={() => {
                  navigatePage(pathRoutesPage.Items);
                }}
              >
                รายการครุภัณฑ์
              </NavDropdown.Item>
              {/*  */}
              <NavDropdown.Item
                style={styles.fontNavLink}
                onClick={() => {
                  navigatePage(pathRoutesPage.HomeCate);
                }}
              >
                หมวดหมู่ครุภัณฑ์
              </NavDropdown.Item>
              {/*  */}
              <NavDropdown.Item
                style={styles.fontNavLink}
                onClick={() => {
                  navigatePage(pathRoutesPage.HomeType);
                }}
              >
                ชนิดครุภัณฑ์
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                style={styles.fontNavLink}
                onClick={() => {
                  navigatePage(pathRoutesPage.CategorySetting);
                }}
              >
                จัดการหมวดหมู่ครุภัณฑ์
              </NavDropdown.Item>
              <NavDropdown.Item
                style={styles.fontNavLink}
                onClick={() => {
                  navigatePage(pathRoutesPage.TypeItemSetting);
                }}
              >
                จัดการชนิดครุภัณฑ์
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/*  */}
          <Nav className="me-auto">
            <NavDropdown
              style={styles.fontNavDropdown}
              title={
                <TitleSetting color={clickPage}>จัดการสถานที่</TitleSetting>
              }
              id="navbarScrollingDropdown"
            >
              {getUserAdmin && (
                <NavDropdown.Item
                  style={styles.fontNavLink}
                  onClick={() => {
                    navigatePage(pathRoutesPage.Faculty);
                  }}
                >
                  คณะ
                </NavDropdown.Item>
              )}

              <NavDropdown.Item
                style={styles.fontNavLink}
                onClick={() => {
                  navigatePage(pathRoutesPage.Department);
                }}
              >
                สาขา
              </NavDropdown.Item>
              <NavDropdown.Item
                style={styles.fontNavLink}
                onClick={() => {
                  navigatePage(pathRoutesPage.Building);
                }}
              >
                อาคาร
              </NavDropdown.Item>
              <NavDropdown.Item
                style={styles.fontNavLink}
                onClick={() => {
                  navigatePage(pathRoutesPage.Location);
                }}
              >
                สถานที่
              </NavDropdown.Item>
            </NavDropdown>
            {getUserAdmin && (
              <Nav.Link
                onClick={() => {
                  navigatePage(pathRoutesPage.Users);
                }}
                style={styles.fontNavLink}
              >
                <EditUser color={clickPage}>จัดการผู้ใช้งาน</EditUser>
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link
              onClick={() => {
                navigatePage(pathRoutesPage.ApplicationDownload);
              }}
              style={styles.fontNavLink}
            >
              <TitleDownload color={clickPage}>
                ดาวน์โหลดแอปพลิเคชัน
              </TitleDownload>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarItem;
