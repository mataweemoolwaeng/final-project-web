import { Navbar, Container } from "react-bootstrap";

import { GetKanitFont } from "../../config/fonts";
import icons from "../../config/icons";

function NavbarTopLogin(props: any) {
  return (
    <Navbar
      collapseOnSelect
      bg="light"
      expand="lg"
      style={{ ...GetKanitFont("KanitLight") }}
    >
      <Container>
        <Navbar.Brand>
          <img
            src={icons.RMUTI_kkc}
            width="100%"
            height="100%"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavbarTopLogin;
