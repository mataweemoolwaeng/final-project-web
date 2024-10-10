import { useState, useMemo } from "react";
import NavbarTop from "../../components/navbar/NavbarTop";
import TableListLocat from "../../components/table/TableListLocat";
// import TableList from "../../components/table/TableList";
import { useNavigate } from "react-router-dom";
import ButtonAdd from "../ItemPage/components/ButtonAdd";
import axios from "axios";
import configAxios from "../../axios/configAxios";
import { API } from "../../axios/swr/endpoint";
import checkToken from "../../config/checkToken";
import { GetKanitFont } from "../../config/fonts";
import NavbarItem from "../../components/navbar/NavbarItem";
import SearchLocation from "./components/search/SearchLocation";
import LoaderTable from "../../components/lottiefiles/LoaderTable";
import pathRoutesPage from "../../router/pathPage";
function Location() {
  const navigate = useNavigate();
  const [clickPage, setClickPage] = useState<string>("setting");
  const [getLocation, setGetLocation] = useState<{}>({});
  const [dataFilter, setDataFilter] = useState<any>(undefined);

  useMemo(async () => {
    try {
      const res = await axios(configAxios("get", API.getLocation));
      setGetLocation(res.data);
    } catch (error: any) {
      // console.log("err = ", error.request.status);
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);
  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={clickPage} />
      <NavbarItem clickPage={clickPage} />
      <div className="d-flex justify-content-center mt-5 mb-2">
        <h3>สถานที่</h3>
      </div>
      <ButtonAdd
        titleButton={"เพิ่มสถานที่"}
        pageAdd={pathRoutesPage.NewLocation}
      />

      {getLocation ? (
        <>
          <div className="d-flex justify-content-end flex-wrap">
            <SearchLocation
              getLocation={getLocation}
              dataFilter={dataFilter}
              setDataFilter={setDataFilter}
            />
          </div>
          <TableListLocat
            isPage={"l"}
            itemList={dataFilter ? dataFilter : getLocation}
            editPage={pathRoutesPage.EditLocation}
          />
        </>
      ) : (
        <LoaderTable />
      )}
    </div>
  );
}

export default Location;
