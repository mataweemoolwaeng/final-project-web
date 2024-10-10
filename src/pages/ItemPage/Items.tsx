import { useState, useMemo, useEffect } from "react";
import NavbarTop from "../../components/navbar/NavbarTop";
// import colors from "../../config/colors";
import ButtonAdd from "./components/ButtonAdd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configAxios from "../../axios/configAxios";
import { API } from "../../axios/swr/endpoint";
import checkToken from "../../config/checkToken";
import TableListItem from "../../components/table/TableListItem";
import { GetKanitFont } from "../../config/fonts";
import NavbarItem from "../../components/navbar/NavbarItem";
import _ from "lodash";
import SearchItem from "./components/dropdowns/SearchItem";
import LoaderTable from "../../components/lottiefiles/LoaderTable";
import pathRoutesPage from "../../router/pathPage";

function Items() {
  const navigate = useNavigate();
  const [getItems, setGetItems] = useState<{}>();

  // *
  // console.log(getItems)
  //

  const clickPage = "items";

  useMemo(async () => {
    try {
      const res = await axios(configAxios("get", API.getItem));
      setGetItems(res.data);
    } catch (error: any) {
      // console.log("err = ", error.request.status);
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);

  // const navigatePage = (page: string, idItem?: any) => {
  //   navigate(page, { state: { id: idItem } });
  // };

  // const [itemFilter, setItemFilter] = useState<any>([]);
  const [dataFilter, setDataFilter] = useState<any>(undefined);

  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={clickPage} />
      <NavbarItem clickPage={clickPage} />
      <div className="d-flex justify-content-center mt-5 mb-2">
        <h3>ครุภัณฑ์ทั้งหมด</h3>
      </div>
      <div className="d-flex justify-content-between">
        <ButtonAdd
          pageAdd={pathRoutesPage.NewItem}
          titleButton={"เพิ่มครุภัณฑ์"}
        />
      </div>

      {getItems ? (
        <>
          <div className="d-flex justify-content-end flex-wrap">
            <SearchItem
              getItems={getItems}
              dataFilter={dataFilter}
              setDataFilter={setDataFilter}
            />
          </div>
          {/* <div className="mx-3">บน/ล่าง</div> */}
          <TableListItem
            itemList={dataFilter ? dataFilter : getItems}
            editPage={pathRoutesPage.EditItem}
          />
        </>
      ) : (
        <LoaderTable />
      )}
    </div>
  );
}

export default Items;
