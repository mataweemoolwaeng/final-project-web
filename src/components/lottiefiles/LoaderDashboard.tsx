import Lottie from "react-lottie";
import jsons from "../../config/index.jsons";
// import { GetKanitFont } from "../../../config/fonts";

function LoaderDashboard() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: jsons.loader_dashboardData,
    // rendererSettings: {
    //   preserveAspectRatio: "xMidYMid slice",
    // },
  };
  return (
    <div style={{ widows: "100%", height: "50%" }}>
      <Lottie options={defaultOptions} />
    </div>
  );
}

export default LoaderDashboard;
