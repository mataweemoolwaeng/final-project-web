import { sweet_basic, sweet_popUpTimer } from "../components/sweetalert2/sweet";
const checkStatus = async (res: any, title?: string) => {
  if (res.status == 200) {
    sweet_popUpTimer("center", "success", title, 1500);
  } else {
    sweet_basic("error", "Server Error", "มีบางอย่างผิดพลาดลองใหม่อีกครั้ง");
  }
};

export default checkStatus;
