import React from "react";
import styled from "styled-components";
import icons from "../../config/index.icons";

const ContainerBox = styled.div`
  // background-color: #dfdf;
  height: 100px;
  /* margin: 10px; */
  /* padding-top: 20px; */
  border-bottom: 1px solid;
  border-color: #000;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const Title = styled.div`
  color: red;
  font-size: 20px medium;
`;

const IconSt = styled.img`
  width: 150px;
  display: block;
`;
function HomeHeader() {
  return (
    <>
      <ContainerBox>
        <IconSt src={icons.icontest}></IconSt>
      </ContainerBox>
    </>
  );
}

export default HomeHeader;
