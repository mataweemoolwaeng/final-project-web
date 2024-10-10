import { sweet_basic } from "../components/sweetalert2/sweet";
const checkToken = (isWant: string, status: number, navigate?: any) => {
  if (isWant === "wantLogin" && status >= 400 && status < 500) {
    sweet_basic("error", "คุณยังไม่ได้เข้าสู่ระบบ", "กรุณาเข้าสู่ระบบ");
    navigate("/login");
  } else if (status >= 500 && status < 600) {
    sweet_basic("error", "Server Error", "มีบางอย่างผิดพลาด");
  } else {
    sweet_basic("error", "Server Error", "มีบางอย่างผิดปกติลองใหม่อีกครั้ง");
  }
};

export default checkToken;
