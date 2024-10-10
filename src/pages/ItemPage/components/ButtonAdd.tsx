import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function ButtonAdd(props: any) {
  const { titleButton, pageAdd } = props;
  const navigate = useNavigate();

  const BoxFlex = styled.div`
    display: flex;
    /* border: 1px solid; */
    align-items: center;
    /* margin-top: 50px; */
    /* margin: 50px; */
  `;

  return (
    <>
      <BoxFlex className="p-5">
        <div>
          <Button
            onClick={() => {
              navigate(pageAdd);
            }}
            style={{ padding: 10, fontSize: 25 }}
            variant="success"
            size="lg"
          >
            <IoAdd size={30} style={{ margin: 5 }} />
            <span>{titleButton}</span>
          </Button>
        </div>
      </BoxFlex>
    </>
  );
}

export default ButtonAdd;
