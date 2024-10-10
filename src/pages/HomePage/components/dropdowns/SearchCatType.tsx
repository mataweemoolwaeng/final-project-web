import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import _ from "lodash";

function SearchCatType(props: any) {
  const { getItems, setDataFilter } = props;
  // console.log("getItems,", getItems);

  const [department, setDepartment] = useState<any>();

  useEffect(() => {
    if (getItems) {
      let arrDepartment = [];

      for (let i = 0; i < getItems.length; i++) {
        arrDepartment.push(getItems[i]?.department?.nameTH);
      }
      setDepartment(Array.from(new Set(arrDepartment)));
    }
  }, [getItems]);

  const [pickAll, setPickAll] = useState<string>("all");
  const [pickDepartment, setPickDepartment] = useState<string>("0");

  const [selected, setSelected] = useState<any>();
  // console.log(selected);

  const BoxFlex = styled.div`
    display: flex;
    align-items: center;
  `;

  // useEffect(() => {
  //   if (selected?.filter === "department") {
  //     const dataItemDpm = _.filter(getItems, (item: any) => {
  //       return item?.department?.nameTH === selected?.value;
  //     });

  //     setDataFilter(dataItemDpm);
  //   } else if (selected?.filter === "all") {
  //     setDataFilter(undefined);
  //   }
  // }, [selected]);
  return (
    <>
      <BoxFlex>
        <Button
          className="d-inline mx-2 m-1"
          onClick={() => {
            setPickAll("all");
            setPickDepartment("0");

            setDataFilter(undefined);
          }}
          style={{
            color: "#000",
            borderColor: "#ced4da",
          }}
          variant={"outline-secondary"}
        >
          ค้นหาทั้งหมด
        </Button>
      </BoxFlex>

      <BoxFlex>
        <Form.Select
          value={pickDepartment}
          className="d-inline mx-2 m-1"
          aria-label="Default select example"
          onChange={(e) => {
            setPickDepartment(e.target.value);
            setPickAll("0");
            //
            if (e.target.value != "0") {
              const dataItemDpm = _.filter(getItems, (item: any) => {
                return item?.department?.nameTH === e.target.value;
              });
              setDataFilter(dataItemDpm);
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
    </>
  );
}

export default SearchCatType;
