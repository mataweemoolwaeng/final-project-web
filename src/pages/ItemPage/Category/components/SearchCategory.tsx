import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import _ from "lodash";

function SearchCategory(props: any) {
  const { getCategory, setDataFilter, dataFilter } = props;

  const [department, setDepartment] = useState<any>();
  const [pickDepartment, setPickDepartment] = useState<string>("0");
  const [pickAll, setPickAll] = useState<string>("all");

  const [selected, setSelected] = useState<any>({
    filter: "all",
    value: "all",
  });

  useEffect(() => {
    if (getCategory) {
      let arrDepartment = [];

      for (let i = 0; i < getCategory.length; i++) {
        arrDepartment.push(getCategory[i]?.department?.nameTH);
      }

      setDepartment(Array.from(new Set(arrDepartment)));
    }
  }, [getCategory]);

  useEffect(() => {
    if (selected?.filter === "department") {
      const dataItemDpm = _.filter(getCategory, (item: any) => {
        return item?.department?.nameTH === selected?.value;
      });
      setDataFilter(dataItemDpm);
    } else {
      setDataFilter(undefined);
    }
  }, [selected]);

  const [search, setSearch] = useState("");
  const onChangeSearch = (text: string) => {
    const items =
      dataFilter == undefined || dataFilter[0] == undefined
        ? getCategory
        : dataFilter;
    // console.log(items);

    if (text) {
      // console.log(text);
      const newData = items.filter((item: any) => {
        const itemData = item?.name
          ? item?.name.toLowerCase()
          : "".toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setDataFilter(newData);
      setSearch(text);
    } else {
      setDataFilter(undefined);
      setSearch(text);
    }
  };
  const BoxFlex = styled.div`
    display: flex;
    align-items: center;
  `;
  return (
    <>
      <div className="d-flex flex-wrap">
        {/*  */}
        <BoxFlex>
          <Button
            className="d-inline mx-2 m-1"
            onClick={() => {
              setPickAll("all");
              setPickDepartment("0");

              setSelected({
                filter: "all",
                value: "all",
              });
            }}
            style={{
              color: pickAll == "all" ? "#fff" : "#000",
              borderColor: "#ced4da",
            }}
            variant={pickAll == "all" ? "secondary" : "outline-secondary"}
          >
            ค้นหาทั้งหมด
          </Button>
        </BoxFlex>
        {/*  */}
        <BoxFlex>
          <Form.Select
            className="d-inline mx-2 m-1"
            aria-label="Default select example"
            value={pickDepartment}
            onChange={(e) => {
              setPickDepartment(e.target.value);
              //
              setPickAll("0");
              if (e.target.value != "0") {
                setSelected({
                  filter: "department",
                  value: e.target.value,
                });
              } else {
                setSelected("");
              }
            }}
          >
            <option value={"0"}>ค้นหาตามหน่วยงาน</option>
            {_.map(department, (item: any, idx: number) => {
              return (
                <option key={idx} value={item}>
                  {item}
                </option>
              );
            })}
          </Form.Select>
        </BoxFlex>
        {/*  */}
        <div className="d-flex justify-content-end ">
          <div className="d-inline mx-2 m-1">
            <Form.Group className="">
              <Form.Control
                // disabled={!pickSearch ? true : false}
                value={search}
                onChange={(event: any) => {
                  const value = event.target.value;
                  onChangeSearch(value);
                  // setPickFacultys("0");
                  setPickDepartment("0");
                }}
                type="text"
                placeholder="ค้นหาชื่อหมวดหมู่(ไทย)"
              />
            </Form.Group>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchCategory;
