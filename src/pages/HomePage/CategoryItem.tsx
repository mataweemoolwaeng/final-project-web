import axios from "axios";
import configAxios from "../../axios/configAxios";
import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../axios/swr/endpoint";
import checkToken from "../../config/checkToken";
import NavbarTop from "../../components/navbar/NavbarTop";
// import styled from "styled-components";
import TableListItem from "../../components/table/TableListItem";
// import { thTable } from "../ItemPage/components/dataItem";
import _ from "lodash";
import { GetKanitFont } from "../../config/fonts";
// import ButtonBack from "../../components/buttons/ButtonBack";
import SearchItem from "../ItemPage/components/dropdowns/SearchItem";
import NavbarItem from "../../components/navbar/NavbarItem";
import LoaderTable from "../../components/lottiefiles/LoaderTable";

function CategoryItem() {
  // const { state } = useLocation();
  const [getItems, setgetItems] = useState<any>();
  const [dataFilter, setDataFilter] = useState<any>(undefined);
  const navigate = useNavigate();

  useMemo(async () => {
    if (!getItems) {
      try {
        let id = localStorage.getItem("pickCateId");
        const res = await axios(
          configAxios("get", `${API.getItemCategory}${id}`)
        );
        setgetItems(res.data);
      } catch (error: any) {
        // console.log("err = ", error);
        checkToken(error.response.data.status, error.request.status, navigate);
      }
    }
  }, [getItems]);

  const clickPage = "items";
  return (
    <div style={{ ...GetKanitFont("KanitLight") }}>
      <NavbarTop clickPage={clickPage} />
      <NavbarItem clickPage={clickPage} />

      {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
      {getItems && getItems.length != 0 ? (
        <>
          <div className="d-flex justify-content-center mt-5 mb-2">
            <h3>{getItems[0].category.name}</h3>
          </div>
          <div className="d-flex justify-content-end flex-wrap">
            <SearchItem getItems={getItems} setDataFilter={setDataFilter} />
          </div>
          <TableListItem
            itemList={dataFilter ? dataFilter : getItems}
            // editPage={"/items/editItem"}
            isPage={"category_item"}
          />
        </>
      ) : (
        <>
          <div className="mt-3" style={{ textAlign: "center", fontSize: 26 }}>
            ยังไม่มีข้อมูลครุภัณฑ์
          </div>
          <LoaderTable />
        </>
      )}
    </div>
  );
}

export default CategoryItem;
