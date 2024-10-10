import { useState, useMemo } from "react";
import NavbarTop from "../../components/navbar/NavbarTop";
import CardList from "./components/CardList";
import { useNavigate } from "react-router-dom";
// import colors from "../../config/colors";
import axios from "axios";
import configAxios from "../../axios/configAxios";
import { API } from "../../axios/swr/endpoint";
import checkToken from "../../config/checkToken";
import { Button } from "react-bootstrap";
import { GetKanitFont } from "../../config/fonts";
import NavbarItem from "../../components/navbar/NavbarItem";
import SearchCatType from "./components/dropdowns/SearchCatType";

function Home() {
  const navigate = useNavigate();
  const [clickPage, setClickPage] = useState<string>("home");
  const [isComponent, setIsComponent] = useState<string>("cate");
  const [getCategory, setGetCategory] = useState<{}>({});
  const [getTypeItem, setGetTypeItem] = useState<{}>({});

  const [dataFilter, setDataFilter] = useState<any>(undefined);


  useMemo(async () => {
    try {
      const res = await axios(configAxios("get", API.getCategory));
      setGetCategory(res.data);
      const resType = await axios(configAxios("get", API.getTypeItem));
      setGetTypeItem(resType.data);
    } catch (error: any) {
      // console.log("err = ", error.request.status);
      checkToken(error.response.data.status, error.request.status, navigate);
    }
  }, []);



  return (
    <>
      <div style={{ ...GetKanitFont("KanitLight") }}>
        <NavbarTop clickPage={clickPage} setClickPage={setClickPage} />
        <NavbarItem clickPage={clickPage} />
        <div className="d-flex justify-content-center mt-5 mb-2">
          <Button
            onClick={() => {
              setIsComponent("cate");
            }}
            variant="light"
          >
            {isComponent === "cate" ? (
              <h3>หมวดหมู่ครุภัณฑ์</h3>
            ) : (
              <h4 style={{ color: "#818181" }}>หมวดหมู่ครุภัณฑ์</h4>
            )}
          </Button>
          <Button
            variant="light"
            onClick={() => {
              setIsComponent("type");
            }}
          >
            {isComponent === "type" ? (
              <h3>ชนิดครุภัณฑ์</h3>
            ) : (
              <h4 style={{ color: "#818181" }}>ชนิดครุภัณฑ์</h4>
            )}
          </Button>
        </div>
        <div className="d-flex justify-content-end flex-wrap">
          {getCategory && (
            <SearchCatType
              getItems={getCategory}
              setDataFilter={setDataFilter}
            />
          )}
        </div>
        {getTypeItem && getCategory && isComponent === "cate" && (
          <CardList
            listItem={dataFilter ? dataFilter : getCategory}
            isShow={"cate"}
            pageShowItem={"/home/category_item"}
          />
        )}
        {getTypeItem && getCategory && isComponent === "type" && (
          <CardList
            listItem={getTypeItem}
            isShow={"type"}
            pageShowItem={"/home/type_item"}
          />
        )}
      </div>
    </>
  );
}

export default Home;
