import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import _ from "lodash";

function SearchDepartment(props: any) {
  const { getDepartment, setDataFilter, dataFilter } = props;

  const [facultys, setFacultys] = useState<any>();

  const [selected, setSelected] = useState<any>({
    filter: "all",
    value: "all",
  });
  useEffect(() => {
    if (getDepartment) {
      let arrFaculty = [];

      for (let i = 0; i < getDepartment.length; i++) {
        arrFaculty.push(getDepartment[i]?.faculty?.nameTH);
      }
      setFacultys(Array.from(new Set(arrFaculty)));
    }
  }, [getDepartment]);
  useEffect(() => {
    if (selected?.filter === "facultys") {
      const dataItemFac = _.filter(getDepartment, (item: any) => {
        return item?.faculty?.nameTH === selected?.value;
      });
      setDataFilter(dataItemFac);
    } else {
      setDataFilter(undefined);
    }
  }, [selected]);

  const [search, setSearch] = useState("");
  const onChangeSearch = (text: string) => {
    const items =
      dataFilter == undefined || dataFilter[0] == undefined
        ? getDepartment
        : dataFilter;
    // console.log(items);

    if (text) {
      // console.log(text);
      const newData = items.filter((item: any) => {
        const itemData = item?.nameTH
          ? item?.nameTH.toLowerCase()
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

  const [pickAll, setPickAll] = useState<string>("all");
  const [pickFacultys, setPickFacultys] = useState<string>("0");
  const BoxFlex = styled.div`
    display: flex;
    align-items: center;
  `;

  return (
    <div className="d-flex flex-wrap">
      <BoxFlex>
        <Button
          className="d-inline mx-2 m-1"
          onClick={() => {
            setPickAll("all");
            setPickFacultys("0");

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
          value={pickFacultys}
          className="d-inline mx-2 m-1"
          aria-label="Default select example"
          onChange={(e) => {
            setPickFacultys(e.target.value);
            //
            setPickAll("0");
            //
            if (e.target.value != "0") {
              setSelected({
                filter: "facultys",
                value: e.target.value,
              });
            } else {
              setSelected("");
            }
          }}
        >
          <option value={"0"}>ค้นหาตามคณะ</option>
          {_.map(facultys, (item: any, idx: number) => {
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
              }}
              type="text"
              placeholder="ค้นหาชื่อสาขา(ไทย)"
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
}

export default SearchDepartment;
