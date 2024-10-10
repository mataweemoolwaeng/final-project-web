import React, { useState } from "react";
import styled from "styled-components";

import _ from "lodash";

const BoxFoter = styled.div`
  display: grid;
  color: 16px;
  column-gap: 20px;
  row-gap: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
  grid-template-columns: 1fr 1fr;
  /* background-color: #000; */
`;
const ImgItem = styled.img`
  width: 100%;
  display: block;
`;
const BoxOnPass = styled.div`
  margin-top: 15px;
  margin-left: 50px;
  margin-right: 50px;
  /* background-color: aqua; */
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid;
  border-color: #000;
`;
const TitleOnPass = styled.h3`
  text-align: center;
`;
const InputText = styled.input`
  /* background-color: aqua; */
  display: flex;
  height: 30px;
  width: 300px;
  border: 1px solid;
  border-color: #000;
  text-align: center;
`;
function HomeFooter(props: any) {
  const [putPhoto, setPutPhoto] = useState("ยังไม่ได้เลือก");
  const [textInput, setextInput] = useState("");
  console.log("textInput = " + textInput);

  const onClickPhoto = (title: string) => {
    console.log("title = " + title);

    setPutPhoto(title);
  };

  const { items } = props;
  return (
    <>
      <BoxOnPass>
        <TitleOnPass>{putPhoto}</TitleOnPass>
      </BoxOnPass>
      <BoxOnPass>
        <InputText
          value={textInput}
          onChange={(e) => {
            setextInput(e.target.value);
          }}
          type={"text"}
          placeholder={"Test"}
        ></InputText>
      </BoxOnPass>

      <BoxFoter>
        {_.map(items, (item: any, index) => {
          return (
            <div key={index}>
              <ImgItem
                onClick={() => {
                  onClickPhoto(item.body);
                }}
                src={item.img}
              ></ImgItem>
              <h4>{item.body}</h4>
            </div>
          );
        })}
      </BoxFoter>
    </>
  );
}

export default HomeFooter;
