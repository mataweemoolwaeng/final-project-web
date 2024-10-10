import { useState } from "react";
import { Form } from "react-bootstrap";
// import styled from "styled-components";
// import _ from "lodash";
function SearchFaculty(props: any) {
  const { getFaculty, setDataFilter, dataFilter } = props;

  const [search, setSearch] = useState("");
  // const [pickSearch, setPickSearch] = useState("");

  const onChangeSearch = (text: string) => {
    const items =
      dataFilter == undefined || dataFilter[0] == undefined
        ? getFaculty
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
  // const BoxFlex = styled.div`
  //   display: flex;
  //   align-items: center;
  // `;
  return (
    <div className="d-flex flex-wrap">
      <div className="d-flex justify-content-end ">
        <div className="d-inline mx-5">
          <Form.Group className="">
            <Form.Control
              // disabled={!pickSearch ? true : false}
              value={search}
              onChange={(event: any) => {
                const value = event.target.value;
                onChangeSearch(value);
              }}
              type="text"
              placeholder="ค้นหาชื่อคณะ(ไทย)"
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
}

export default SearchFaculty;
