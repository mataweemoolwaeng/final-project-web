import axios from "axios";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import configAxios from "../../../axios/configAxios";
import { API } from "../../../axios/swr/endpoint";
import NavbarItem from "../../../components/navbar/NavbarItem";
import NavbarTop from "../../../components/navbar/NavbarTop";
import checkToken from "../../../config/checkToken";
import { GetKanitFont } from "../../../config/fonts";
import ShowProfile from "./components/ShowProfile";
import ShowImgProfile from "./components/ShowImgProfile";
import env from "react-dotenv";
// {`(version ${env.REACT_APP_VERSION}) BETA`}

function Profile() {
  const navigate = useNavigate();
  const [clickPage, setClickPage] = useState<string>("admin");
  const [getProfile, setGetProfile] = useState<any>();

  const [upDateData, setUpDateData] = useState(false);

  const switchUpdateData = () => {
    setUpDateData(!upDateData);
  };
  useMemo(async () => {
    try {
      const res = await axios(configAxios("get", API.getProfile));
      
      setGetProfile(res.data);
      
    } catch (error: any) {
      console.log("err = ", error.request.status);
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, [upDateData]);

  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={clickPage} />
      <NavbarItem clickPage={clickPage} />
      <div className="d-flex justify-content-center mt-4 mb-2">
        <h3>โปรไฟล์ของ {getProfile?.firstname}</h3>
      </div>
      {getProfile && (
        <ShowImgProfile
          getProfile={getProfile}
          switchUpdateData={switchUpdateData}
        />
      )}
      {getProfile && <ShowProfile getProfile={getProfile} />}
      <div className="d-flex justify-content-end">
        version {env.REACT_APP_VERSION}
      </div>
    </div>
  );
}

export default Profile;
