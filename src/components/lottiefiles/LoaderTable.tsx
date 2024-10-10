import Lottie from "react-lottie";
import jsons from "../../config/index.jsons";
// import { GetKanitFont } from "../../../config/fonts";

function LoaderTable() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: jsons.loader_table,
    // rendererSettings: {
    //   preserveAspectRatio: "xMidYMid slice",
    // },
  };
  return (
    <div style={{ widows: "100%", height: "100%" }}>
      <Lottie options={defaultOptions} />
    </div>
  );
}

export default LoaderTable;
