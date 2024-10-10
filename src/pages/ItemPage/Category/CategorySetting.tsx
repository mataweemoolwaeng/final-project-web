import { useState, useMemo } from "react";
import NavbarItem from "../../../components/navbar/NavbarItem";
import NavbarTop from "../../../components/navbar/NavbarTop";
import { GetKanitFont } from "../../../config/fonts";
import ButtonAdd from "../components/ButtonAdd";
import { useNavigate } from "react-router-dom";
import TableListTypeCate from "../../../components/table/TableListTypeCate";
import axios from "axios";
import { API } from "../../../axios/swr/endpoint";
import configAxios from "../../../axios/configAxios";
import checkToken from "../../../config/checkToken";
import SearchCategory from "./components/SearchCategory";
import LoaderTable from "../../../components/lottiefiles/LoaderTable";
import pathRoutesPage from "../../../router/pathPage";
function CategorySetting() {
  const navigate = useNavigate();
  const [getCategory, setGetCategory] = useState<{}>();
  const [dataFilter, setDataFilter] = useState<any>(undefined);
  useMemo(async () => {
    try {
      const res = await axios(configAxios("get", API.getCategory));
      setGetCategory(res.data);
    } catch (error: any) {
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);
  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={"items"} />
      <NavbarItem clickPage={"items"} />
      <div className="d-flex justify-content-center mt-5 mb-2">
        <h3>หมวดหมู่ครุภัณฑ์</h3>
      </div>
      <ButtonAdd
        titleButton={"เพิ่มหมวดหมู่ครุภัณฑ์"}
        pageAdd={pathRoutesPage.NewCateItem}
      />

      {getCategory ? (
        <>
          <div className="d-flex justify-content-end flex-wrap">
            <SearchCategory
              getCategory={getCategory}
              dataFilter={dataFilter}
              setDataFilter={setDataFilter}
            />
          </div>
          <TableListTypeCate
            itemList={dataFilter ? dataFilter : getCategory}
            isPage={"cate"}
          />
        </>
      ) : (
        <LoaderTable />
      )}
    </div>
  );
}

export default CategorySetting;
