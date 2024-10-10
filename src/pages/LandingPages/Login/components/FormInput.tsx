import { useState } from "react";
import postLogin from "../../../../axios/postLogin";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import {
  sweet_basic,
  sweet_mixin,
} from "../../../../components/sweetalert2/sweet";

const MySwal = withReactContent(Swal);

function FormInput(props: any) {
  const { navigate, setlocalStorage } = props;

  const [inputs, setInputs] = useState<any>({});
  // const [user, setUser] = useState<any>();
  // console.log(inputs);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const res: any = await postLogin(inputs.username, inputs.password);
    // console.log(res?.data?.user.user_status);
    // console.log(res);

    if (res.status == 200 && res.status <= 201) {
      if (res?.data?.user.user_status) {
        await sweet_mixin(
          "top-end",
          "success",
          "เข้าสู่ระบบเสร็จสิ้น",
          "ระบบกำลังนำทาง",
          3000
        ).then(() => {
          // console.log("123");
          setlocalStorage(
            res.data.user.web_token,
            res.data.user.admin,
            res.data
          );
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        });
      } else {
        sweet_basic(
          "error",
          "บัญชีผู้ใช้นี้โดนปิดการใช้งาน",
          `กรุณาติดต่อผู้ดูเเลระบบ`
        );
      }
    } else if (res.status >= 400 && res.status <= 450) {
      sweet_basic(
        "error",
        "รหัสผิดพลาด",
        `กรุณาตรวจสอบ Username และ Password ของท่านอีกรอบ`
      );
    } else {
      MySwal.fire({
        title: <strong>มีบางอย่างผิดปกติ</strong>,
        html: <i></i>,
        icon: "error",
      }).then((value: any) => {});
    }

    // setUser(res);
  };

  const styles = {
    container: {
      display: "flex",
      width: "100%",
      height: "100%",
    },
    card_box: {
      backgroundColor: "#fff",
      padding: 50,
      width: "100%",
      // height: "100%",
      // top: "15vh",
      // margin: 20,
    },
  };
  return (
    <>
      <Card className="my-2" style={styles.card_box}>
        <h3 style={{ textAlign: "center" }}>เข้าสู่ระบบ</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>

          <Container>
            <div className="d-flex justify-content-center">
              <Button
                variant={
                  inputs?.username && inputs?.password ? "success" : "secondary"
                }
                type="submit"
                onClick={(event: any) => {
                  if (inputs?.username && inputs?.password) {
                    handleSubmit(event);
                  } else {
                    event.preventDefault();
                    sweet_basic(
                      "warning",
                      "ข้อมูลไม่ครบ",
                      `กรุณากรอก Username และ Password ให้เรียบร้อย`
                    );
                  }
                }}
              >
                {inputs?.username && inputs?.password
                  ? "ลงชื่อเข้าใช้งาน"
                  : "ลงชื่อเข้าใช้งาน"}
              </Button>
            </div>
          </Container>
        </Form>
      </Card>
    </>
  );
}

export default FormInput;
