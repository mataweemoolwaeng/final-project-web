import { useState, useMemo } from "react";
import TableListLocat from "../../components/table/TableListLocat";
import NavbarTop from "../../components/navbar/NavbarTop";
import ButtonAdd from "../ItemPage/components/ButtonAdd";
import axios from "axios";
import configAxios from "../../axios/configAxios";
import { API } from "../../axios/swr/endpoint";
import checkToken from "../../config/checkToken";
import { useNavigate } from "react-router-dom";
import { GetKanitFont } from "../../config/fonts";
import NavbarItem from "../../components/navbar/NavbarItem";
import SearchFaculty from "./components/search/SearchFaculty";
// import { Container } from "react-bootstrap";
import LoaderTable from "../../components/lottiefiles/LoaderTable";
import pathRoutesPage from "../../router/pathPage";

function Faculty() {
  const navigate = useNavigate();
  const clickPage = "setting";
  const [getFaculty, setGetFaculty] = useState<{}>();
  const [dataFilter, setDataFilter] = useState<any>(undefined);

  useMemo(async () => {
    try {
      const res = await axios(configAxios("get", API.getFaculty));
      setGetFaculty(res.data);
    } catch (error: any) {
      // console.log("err = ", error.request.status);
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);
  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={clickPage} />
      <NavbarItem clickPage={clickPage} />
      <div className="d-flex justify-content-center mt-5">
        <h3>คณะ</h3>
      </div>
      <ButtonAdd titleButton={"เพิ่มคณะ"} pageAdd={pathRoutesPage.NewFaculty} />
      {getFaculty ? (
        <>
          <div className="d-flex justify-content-end flex-wrap">
            <SearchFaculty
              getFaculty={getFaculty}
              dataFilter={dataFilter}
              setDataFilter={setDataFilter}
            />
          </div>
          <TableListLocat
            itemList={dataFilter ? dataFilter : getFaculty}
            isPage="f"
            editPage={pathRoutesPage.EditFaculty}
          />
        </>
      ) : (
        <LoaderTable />
      )}
    </div>
  );
}

export default Faculty;
