import { useState, useEffect } from "react";
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";
import _ from "lodash";
import {
  chackStatusItem,
  chackStatusItemColor,
} from "../../../../config/chackStatusItem";

function SearchItem(props: any) {
  const { getItems, setDataFilter, dataFilter } = props;

  const [items, setItems] = useState<object>(getItems);
  // console.log(items);
  const [facultys, setFacultys] = useState<any>();
  const [department, setDepartment] = useState<any>();
  const [building, setBuilding] = useState<any>();
  const [location, setLocation] = useState<any>();
  const [statusItem, setStatusItem] = useState<any>();
  // console.log(statusItem);

  const [pickAll, setPickAll] = useState<string>("all");
  // console.log(pickAll);

  const [pickFacultys, setPickFacultys] = useState<string>("0");
  const [pickDepartment, setPickDepartment] = useState<string>("0");
  const [pickBuilding, setPickBuilding] = useState<string>("0");
  const [pickLocation, setPickLocation] = useState<string>("0");
  const [pickStatusItem, setPickStatusItem] = useState<any>("0");
  const [pickUnderrated, setPickUnderrated] = useState<any>("0");
  const [pickWaitNumbe, setPickWaitNumbe] = useState<any>("0");
  const [selected, setSelected] = useState<any>({
    filter: "all",
    value: "all",
  });

  useEffect(() => {}, [
    pickAll,
    pickFacultys,
    pickDepartment,
    pickBuilding,
    pickLocation,
    pickStatusItem,
  ]);

  useEffect(() => {
    if (getItems) {
      setItems(getItems);

      let arrFaculty = [],
        arrDepartment = [],
        arrBuilding = [],
        arrLocation = [],
        arrStatusItem = [];
      for (let i = 0; i < getItems.length; i++) {
        arrFaculty.push(getItems[i]?.faculty?.nameTH);
        arrDepartment.push(getItems[i]?.department?.nameTH);
        arrBuilding.push(getItems[i]?.building?.nameTH);
        arrLocation.push(getItems[i]?.location?.nameTH);
        arrStatusItem.push(getItems[i]?.status_item);
      }

      setFacultys(Array.from(new Set(arrFaculty)));
      setDepartment(Array.from(new Set(arrDepartment)));
      setBuilding(Array.from(new Set(arrBuilding)));
      setLocation(Array.from(new Set(arrLocation)));
      setStatusItem(Array.from(new Set(arrStatusItem)));
    }
  }, [getItems]);

  useEffect(() => {
    if (selected?.filter === "facultys") {
      const dataItemFac = _.filter(getItems, (item: any) => {
        return item?.faculty?.nameTH === selected?.value;
      });

      setDataFilter(dataItemFac);
      // localStorage.setItem("paginationItem", "1");
    } else if (selected?.filter === "department") {
      const dataItemDpm = _.filter(getItems, (item: any) => {
        return item?.department?.nameTH === selected?.value;
      });

      setDataFilter(dataItemDpm);
      // localStorage.setItem("paginationItem", "1");
    } else if (selected?.filter === "building") {
      const dataItemBud = _.filter(getItems, (item: any) => {
        return item?.building?.nameTH === selected?.value;
      });

      setDataFilter(dataItemBud);
      // localStorage.setItem("paginationItem", "1");
    } else if (selected?.filter === "location") {
      const dataItemLocate = _.filter(getItems, (item: any) => {
        return item?.location?.nameTH === selected?.value;
      });

      setDataFilter(dataItemLocate);
      // localStorage.setItem("paginationItem", "1");
    } else if (selected?.filter === "location") {
      const dataItemLocate = _.filter(getItems, (item: any) => {
        return item?.location?.nameTH === selected?.value;
      });

      setDataFilter(dataItemLocate);
      // localStorage.setItem("paginationItem", "1");
    } else if (selected?.filter === "status_item") {
      let status_item: any;
      if (selected?.value == "true" || selected?.value == "false") {
        status_item = selected?.value === "true" ? true : false;
      } else {
        status_item = selected?.value;
      }
      // console.log("status_item = ", status_item + typeof status_item);
      const dataItemLocate = _.filter(getItems, (item: any) => {
        return item?.status_item == status_item;
      });

      setDataFilter(dataItemLocate);
      // localStorage.setItem("paginationItem", "1");
    } else if (selected?.filter === "underrated") {
      const dataItemLocate = _.filter(getItems, (item: any) => {
        return item?.price < 5000;
      });

      setDataFilter(dataItemLocate);
      // localStorage.setItem("paginationItem", "1");
    } else if (selected?.filter === "WaitNumbe") {
      const dataItemLocate = _.filter(getItems, (item: any) => {
        return (
          item?.code.length <= 9 ||
          item?.code.length == "-" ||
          item?.code.length == "ไม่มี"
        );
      });

      setDataFilter(dataItemLocate);
      // localStorage.setItem("paginationItem", "1");
    } else {
      setDataFilter(undefined);

      let getPagination: any = localStorage.getItem("paginationItem");
      localStorage.setItem("paginationItem", getPagination);
    }

    // console.log(selected);
  }, [selected]);

  const BoxFlex = styled.div`
    display: flex;
    align-items: center;
  `;

  const [search, setSearch] = useState("");
  const [pickSearch, setPickSearch] = useState("");
  // console.log(pickSearch);

  const onChangeSearch = (text: string) => {
    const items =
      dataFilter == undefined || dataFilter[0] == undefined
        ? getItems
        : dataFilter;
    // console.log(items);

    if (text) {
      // console.log(text);
      if (pickSearch === "name") {
        const newData = items.filter((item: any) => {
          const itemData = item?.name
            ? item.name.toLowerCase()
            : "".toLowerCase();

          const textData = text.toLowerCase();

          return itemData.indexOf(textData) > -1;
        });
        setDataFilter(newData);
        setSearch(text);
      }
      if (pickSearch === "code") {
        const newData = items.filter((item: any) => {
          const itemData = item?.code
            ? item.code.toLowerCase()
            : "".toLowerCase();

          const textData = text.toLowerCase();

          return itemData.indexOf(textData) > -1;
        });
        setDataFilter(newData);
        setSearch(text);
      }
    } else {
      setDataFilter(undefined);
      setSearch(text);
    }
  };
  return (
    <div>
      <div className="d-flex flex-wrap">
        <BoxFlex>
          <Button
            className="d-inline mx-2 m-1"
            onClick={() => {
              setPickAll("all");
              setPickFacultys("0");
              setPickDepartment("0");
              setPickBuilding("0");
              setPickLocation("0");
              setPickStatusItem("0");
              setPickUnderrated("0");
              setPickWaitNumbe("0");
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
          <Button
            className="d-inline mx-2 m-1"
            onClick={() => {
              setPickWaitNumbe("WaitNumbe");
              setPickAll("0");
              setPickFacultys("0");
              setPickDepartment("0");
              setPickBuilding("0");
              setPickLocation("0");
              setPickStatusItem("0");
              setPickUnderrated("0");
              setSelected({
                filter: "WaitNumbe",
                value: "WaitNumbe",
              });
            }}
            style={{
              color: pickWaitNumbe == "WaitNumbe" ? "#fff" : "#000",
              borderColor: "#ced4da",
            }}
            variant={
              pickWaitNumbe == "WaitNumbe" ? "secondary" : "outline-secondary"
            }
          >
            รอหมายเลขครุภัณฑ์
          </Button>
          {/*  */}
        </BoxFlex>
        {/*  */}
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-disabled">
              ครุภัณฑ์ต่ำกว่าเกณฑ์ มีมูลค่าต่ำกว่า 5,000 บาท
            </Tooltip>
          }
        >
          <BoxFlex>
            <Button
              className="d-inline mx-2 m-1"
              onClick={() => {
                setPickUnderrated("underrated");
                setPickAll("0");
                setPickWaitNumbe("0");
                setPickFacultys("0");
                setPickDepartment("0");
                setPickBuilding("0");
                setPickLocation("0");
                setPickStatusItem("0");

                setSelected({
                  filter: "underrated",
                  value: "underrated",
                });
              }}
              style={{
                color: pickUnderrated == "underrated" ? "#fff" : "#000",
                borderColor: "#ced4da",
              }}
              variant={
                pickUnderrated == "underrated"
                  ? "secondary"
                  : "outline-secondary"
              }
            >
              ครุภัณฑ์ต่ำกว่าเกณฑ์
            </Button>
          </BoxFlex>
        </OverlayTrigger>
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
              setPickLocation("0");
              setPickStatusItem("0");
              setPickAll("0");
              setPickWaitNumbe("0");
              setPickUnderrated("0");
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

        <BoxFlex>
          <Form.Select
            className="d-inline mx-2 m-1"
            aria-label="Default select example"
            value={pickDepartment}
            onChange={(e) => {
              setPickDepartment(e.target.value);
              setPickFacultys("0");
              setPickBuilding("0");
              setPickLocation("0");
              setPickStatusItem("0");
              setPickAll("0");
              setPickWaitNumbe("0");
              setPickUnderrated("0");

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

              setPickFacultys("0");
              setPickDepartment("0");
              setPickLocation("0");
              setPickStatusItem("0");
              setPickAll("0");
              setPickWaitNumbe("0");
              setPickUnderrated("0");

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
        <BoxFlex>
          <Form.Select
            className="d-inline mx-2 m-1"
            aria-label="Default select example"
            value={pickLocation}
            onChange={(e) => {
              setPickLocation(e.target.value);
              setPickFacultys("0");
              setPickDepartment("0");
              setPickBuilding("0");
              setPickStatusItem("0");
              setPickAll("0");
              setPickWaitNumbe("0");
              setPickUnderrated("0");

              if (e.target.value != "0") {
                setSelected({
                  filter: "location",
                  value: e.target.value,
                });
              } else {
                setSelected("");
              }
            }}
          >
            <option value={"0"}>ค้นหาตามสถานที่</option>
            {_.map(location, (item: any, idx: number) => {
              return (
                <option key={idx} value={item}>
                  {item}
                </option>
              );
            })}
          </Form.Select>
        </BoxFlex>
        <BoxFlex>
          <Form.Select
            className="d-inline mx-2 m-1"
            aria-label="Default select example"
            value={pickStatusItem}
            onChange={(e: any) => {
              const value = e.target.value;
              // console.log(value);

              setPickStatusItem(value);
              setPickFacultys("0");
              setPickDepartment("0");
              setPickBuilding("0");
              setPickLocation("0");
              setPickAll("0");
              setPickWaitNumbe("0");
              setPickUnderrated("0");

              if (e.target.value != "0") {
                setSelected({
                  filter: "status_item",
                  value: e.target.value,
                });
              } else {
                setSelected("");
              }
            }}
          >
            <option value={"0"}>ค้นหาตามสถานะ</option>
            {_.map(statusItem, (item: any, idx: number) => {
              return (
                <option
                  style={{ color: chackStatusItemColor(item) }}
                  key={idx}
                  value={item}
                >
                  {chackStatusItem(item)}
                </option>
              );
            })}
          </Form.Select>
        </BoxFlex>
      </div>
      {/*  */}
      <div className="d-flex justify-content-end ">
        <div className="d-inline mx-2 m-1">
          <Form.Group className="mt-1">
            <Form.Control
              disabled={!pickSearch ? true : false}
              value={search}
              onChange={(event: any) => {
                const value = event.target.value;
                onChangeSearch(value);
              }}
              type="text"
              placeholder="ค้นหา ชื่อ/รหัสครุภัณฑ์"
            />
          </Form.Group>
        </div>
        <fieldset className="d-flex align-self-center  mt-1">
          <Form.Check
            // checked={pickSearch == "" ? true : true}
            className="m-1"
            type="radio"
            label="ค้าหาตามชื่อ"
            name="formHorizontalRadios"
            id="formHorizontalRadios1"
            onChange={(event: any) => {
              // console.log(event.target.checked);
              setPickUnderrated("0");
              if (event.target.checked) {
                setPickSearch("name");
              } else {
              }
            }}
          />
          <Form.Check
            className="m-1"
            type="radio"
            label="ค้าหาตามรหัสครุภัณฑ์"
            name="formHorizontalRadios"
            id="formHorizontalRadios2"
            onChange={(event: any) => {
              // console.log(event.target.checked);
              setPickUnderrated("0");
              if (event.target.checked) {
                setPickSearch("code");
              } else {
              }
            }}
          />
        </fieldset>
      </div>
    </div>
  );
}

export default SearchItem;
