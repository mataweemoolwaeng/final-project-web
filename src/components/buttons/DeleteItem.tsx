import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function DeleteItem(props: any) {
  const { titleButton, setModal } = props;
  const navigate = useNavigate();
  return (
    <>
      <div className="m-5 align-items-center">
        <Button
          variant="danger"
          onClick={() => {
            setModal(true);
          }}
        >
          <span>{titleButton}</span>
        </Button>
      </div>
    </>
  );
}

export default DeleteItem;
