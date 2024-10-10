import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import _ from "lodash";
import styled from "styled-components";

function SearchUser(props: any) {
  const { setDataFilter, dataFilter, getUsers } = props;

  const [pickDepartment, setPickDepartment] = useState<string>("0");
  const [department, setDepartment] = useState<any>();
  const [pickAll, setPickAll] = useState<string>("all");
  useEffect(() => {
    if (getUsers) {
      let arrDepartment = [];

      for (let i = 0; i < getUsers.length; i++) {
        arrDepartment.push(getUsers[i]?.department?.nameTH);
      }
      setDepartment(Array.from(new Set(arrDepartment)));
    }
  }, [getUsers]);
  //
  const [search, setSearch] = useState("");
  const [pickSearch, setPickSearch] = useState("");
  const onChangeSearch = (text: string) => {
    // console.log(text);
    const items =
      dataFilter == undefined || dataFilter[0] == undefined
        ? getUsers
        : dataFilter;
    // console.log(items);

    if (text) {
      // console.log(text);
      if (pickSearch === "name") {
        const newData = items.filter((item: any) => {
          const itemData = item?.firstname
            ? item.firstname.toLowerCase()
            : "".toLowerCase();

          const textData = text.toLowerCase();

          return itemData.indexOf(textData) > -1;
        });
        setDataFilter(newData);
        setSearch(text);
      }
      if (pickSearch === "userid") {
        const newData = items.filter((item: any) => {
          const itemData = item?.user?.username
            ? item?.user?.username.toLowerCase()
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
  const [selected, setSelected] = useState<any>({
    filter: "all",
    value: "all",
  });

  useEffect(() => {
    if (selected?.filter === "department") {
      const dataItemDpm = _.filter(getUsers, (item: any) => {
        return item?.department?.nameTH === selected?.value;
      });
      setDataFilter(dataItemDpm);
    } else {
      setDataFilter(undefined);
    }

    // console.log(selected);
  }, [selected]);

  const BoxFlex = styled.div`
    display: flex;
    align-items: center;
  `;
  return (
    <>
      <div className="d-flex flex-wrap">
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
        <BoxFlex>
          <Form.Select
            className="d-inline mx-2 m-1"
            aria-label="Default select example"
            value={pickDepartment}
            onChange={(e) => {
              setPickDepartment(e.target.value);
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
                placeholder="ค้นหา ชื่อ/รหัส"
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
                if (event.target.checked) {
                  setPickSearch("name");
                } else {
                }
              }}
            />
            <Form.Check
              className="m-1"
              type="radio"
              label="ค้าหาตามรหัส(Username)"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
              onChange={(event: any) => {
                // console.log(event.target.checked);
                if (event.target.checked) {
                  setPickSearch("userid");
                } else {
                }
              }}
            />
          </fieldset>
        </div>
      </div>
    </>
  );
}

export default SearchUser;
