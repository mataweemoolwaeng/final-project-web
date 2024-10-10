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
import { Button } from "react-bootstrap";
import LoaderTable from "../../components/lottiefiles/LoaderTable";

function TypeItems() {
  // const { state } = useLocation();
  const [getItems, setgetItems] = useState<any>();
  // const [itemList, setItemList] = useState<any>([]);
  const [dataFilter, setDataFilter] = useState<any>(undefined);
  const navigate = useNavigate();
  // console.log(state);
  // console.log(localStorage.getItem("pickTypeId"));

  useMemo(async () => {
    if (!getItems) {
      try {
        let id = localStorage.getItem("pickTypeId");
        const res = await axios(
          configAxios("get", `${API.getItemByTypeID}${id}`)
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
      {getItems && getItems.length != 0 ? (
        <>
          <div className="d-flex justify-content-center mt-5 mb-2">
            <h3>{getItems[0].typeitem.name}</h3>
          </div>
          {/* <ButtonBack titleButton={"ย้อนกลับ"} /> */}
          <div className="d-flex justify-content-end flex-wrap">
            <SearchItem getItems={getItems} setDataFilter={setDataFilter} />
          </div>
          <TableListItem
            itemList={dataFilter ? dataFilter : getItems}
            editPage={"/items/editItem"}
          />
        </>
      ) : (
        <>
          <div className="mt-3" style={{ textAlign: "center", fontSize: 26 }}>
            ยังไม่มีข้อมูลครุภัณฑ์
          </div>
          {/* <div className="d-flex justify-content-center mt-1">
            <Button variant="danger">ลบชนิดครุภัณฑ์</Button>
          </div> */}

          <LoaderTable />
        </>
      )}
    </div>
  );
}

export default TypeItems;
