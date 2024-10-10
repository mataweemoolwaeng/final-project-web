import { useState, useMemo } from "react";
import NavbarTop from "../../components/navbar/NavbarTop";
import CardList from "./components/CardList";
import { useNavigate } from "react-router-dom";
import configAxios from "../../axios/configAxios";
import axios from "axios";
import checkToken from "../../config/checkToken";
import { API } from "../../axios/swr/endpoint";
import { GetKanitFont } from "../../config/fonts";
import SearchCatType from "./components/dropdowns/SearchCatType";
import NavbarItem from "../../components/navbar/NavbarItem";
import ButtonAdd from "../ItemPage/components/ButtonAdd";
// import { Container } from "react-bootstrap";
import LoaderCard from "../../components/lottiefiles/LoaderCard";
import pathRoutesPage from "../../router/pathPage";
function HomeCate() {
  const clickPage = "items";
  const navigate = useNavigate();
  const [getCategory, setGetCategory] = useState<any>();
  const [dataFilter, setDataFilter] = useState<any>(undefined);
  // console.log(getCategory);

  useMemo(async () => {
    try {
      const res = await axios(configAxios("get", API.getCategory));
      setGetCategory(res.data);
      localStorage.setItem("paginationItem", "1");
    } catch (error: any) {
      // console.log("err = ", error.request.status);
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);
  return (
    <>
      <div style={{ ...GetKanitFont("KanitLight") }}>
        <NavbarTop clickPage={clickPage} />
        <NavbarItem clickPage={clickPage} />
        <div className="d-flex justify-content-center mt-5 mb-2">
          <h3>หมวดหมู่ครุภัณฑ์</h3>
        </div>

        <ButtonAdd
          titleButton={"เพิ่มหมวดหมู่ครุภัณฑ์"}
          pageAdd={pathRoutesPage.NewCateItem}
        />

        {getCategory && getCategory.length != 0 ? (
          <>
            <div className="mt-3 d-flex justify-content-end flex-wrap">
              <SearchCatType
                getItems={getCategory}
                setDataFilter={setDataFilter}
              />
            </div>
            <CardList
              listItem={dataFilter ? dataFilter : getCategory}
              isShow={"cate"}
              pageShowItem={pathRoutesPage.CategoryItem}
            />
          </>
        ) : (
          <>
            <div className="mt-3" style={{ textAlign: "center", fontSize: 22 }}>
              ยังไม่มีข้อมูลหมวดหมู่ครุภัณฑ์
            </div>
            <LoaderCard />
          </>
        )}
      </div>
    </>
  );
}

export default HomeCate;
