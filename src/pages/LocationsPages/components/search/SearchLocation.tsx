import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import _ from "lodash";

function SearchLocation(props: any) {
  const { getLocation, setDataFilter, dataFilter } = props;
  const [facultys, setFacultys] = useState<any>();
  const [department, setDepartment] = useState<any>();
  const [building, setBuilding] = useState<any>();

  const [pickAll, setPickAll] = useState<string>("all");
  const [pickFacultys, setPickFacultys] = useState<string>("0");
  const [pickDepartment, setPickDepartment] = useState<string>("0");
  const [pickBuilding, setPickBuilding] = useState<string>("0");

  useEffect(() => {
    if (getLocation) {
      let arrFaculty = [],
        arrDepartment = [],
        arrBuilding = [];

      for (let i = 0; i < getLocation.length; i++) {
        arrFaculty.push(getLocation[i]?.faculty?.nameTH);
        arrDepartment.push(getLocation[i]?.department?.nameTH);
        arrBuilding.push(getLocation[i]?.building?.nameTH);
      }

      setFacultys(Array.from(new Set(arrFaculty)));
      setDepartment(Array.from(new Set(arrDepartment)));
      setBuilding(Array.from(new Set(arrBuilding)));
    }
  }, [getLocation]);

  const [selected, setSelected] = useState<any>({
    filter: "all",
    value: "all",
  });

  useEffect(() => {
    if (selected?.filter === "facultys") {
      const dataItemFac = _.filter(getLocation, (item: any) => {
        return item?.faculty?.nameTH === selected?.value;
      });
      setDataFilter(dataItemFac);
    } else if (selected?.filter === "department") {
      const dataItemDpm = _.filter(getLocation, (item: any) => {
        return item?.department?.nameTH === selected?.value;
      });
      setDataFilter(dataItemDpm);
    } else if (selected?.filter === "building") {
      const dataItemBud = _.filter(getLocation, (item: any) => {
        return item?.building?.nameTH === selected?.value;
      });
      setDataFilter(dataItemBud);
    } else {
      setDataFilter(undefined);
    }

    // console.log(selected);
  }, [selected]);

  const [search, setSearch] = useState("");
  const onChangeSearch = (text: string) => {
    const items =
      dataFilter == undefined || dataFilter[0] == undefined
        ? getLocation
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
  const BoxFlex = styled.div`
    display: flex;
    align-items: center;
  `;
  return (
    <div className="d-flex flex-wrap">
      {/*  */}
      <BoxFlex>
        <Button
          className="d-inline mx-2 m-1"
          onClick={() => {
            setPickAll("all");
            setPickFacultys("0");
            setPickDepartment("0");
            setPickBuilding("0");
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
            setPickDepartment("0");
            setPickBuilding("0");
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
      <BoxFlex>
        <Form.Select
          className="d-inline mx-2 m-1"
          aria-label="Default select example"
          value={pickDepartment}
          onChange={(e) => {
            setPickDepartment(e.target.value);
            setPickFacultys("0");
            setPickBuilding("0");
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
          <option value={"0"}>ค้นหาตามสาขา</option>
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
      <BoxFlex>
        <Form.Select
          className="d-inline mx-2 m-1"
          aria-label="Default select example"
          value={pickBuilding}
          onChange={(e) => {
            setPickBuilding(e.target.value);
            //
            setPickFacultys("0");
            setPickDepartment("0");
            setPickAll("0");
            if (e.target.value != "0") {
              setSelected({
                filter: "building",
                value: e.target.value,
              });
            } else {
              setSelected("");
            }
          }}
        >
          <option value={"0"}>ค้นหาตามอาคาร</option>
          {_.map(building, (item: any, idx: number) => {
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
              placeholder="ค้นหาชื่อสถานที่(ไทย)"
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
}

export default SearchLocation;
