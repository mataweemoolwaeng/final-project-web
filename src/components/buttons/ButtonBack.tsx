import Button from "react-bootstrap/Button";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { BsBoxArrowInLeft } from "react-icons/bs";

function ButtonBack(props: any) {
  const { titleButton } = props;
  const navigate = useNavigate();

  const BoxFlex = styled.div`
    display: flex;
    /* border: 1px solid; */
    align-items: center;
    /* margin-top: 50px;
    margin: 50px; */
  `;

  return (
    <>
      <BoxFlex className="m-5">
        <div>
          <Button
            onClick={() => {
              navigate(-1);
            }}
            style={{ padding: 10, fontSize: 25 }}
            variant="secondary"
            size="lg"
          >
            <BsBoxArrowInLeft size={30} style={{ margin: 5 }} />
            <span>{titleButton}</span>
          </Button>
        </div>
      </BoxFlex>
    </>
  );
}

export default ButtonBack;
