import { useState, useMemo } from "react";
import NavbarTop from "../../components/navbar/NavbarTop";

import TableListLocat from "../../components/table/TableListLocat";
import ButtonAdd from "../ItemPage/components/ButtonAdd";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import configAxios from "../../axios/configAxios";
import { API } from "../../axios/swr/endpoint";
import checkToken from "../../config/checkToken";
import { GetKanitFont } from "../../config/fonts";
import NavbarItem from "../../components/navbar/NavbarItem";
import SearchBuilding from "./components/search/SearchBuilding";
import LoaderTable from "../../components/lottiefiles/LoaderTable";
import pathRoutesPage from "../../router/pathPage";
function Building() {
  const navigate = useNavigate();
  const clickPage = "setting";
  const [getBuilding, setGetBuilding] = useState<{}>();
  const [dataFilter, setDataFilter] = useState<any>(undefined);

  useMemo(async () => {
    try {
      const res = await axios(configAxios("get", API.getBuilding));
      setGetBuilding(res.data);
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
        <h3>อาคาร</h3>
      </div>
      <ButtonAdd
        titleButton={"เพิ่มอาคาร"}
        pageAdd={pathRoutesPage.NewBuilding}
      />

      {getBuilding ? (
        <>
          <div className="d-flex justify-content-end flex-wrap">
            <SearchBuilding
              getBuilding={getBuilding}
              dataFilter={dataFilter}
              setDataFilter={setDataFilter}
            />
          </div>
          <TableListLocat
            isPage={"b"}
            itemList={dataFilter ? dataFilter : getBuilding}
            editPage={pathRoutesPage.EditBuilding}
          />
        </>
      ) : (
        <LoaderTable />
      )}
    </div>
  );
}

export default Building;
