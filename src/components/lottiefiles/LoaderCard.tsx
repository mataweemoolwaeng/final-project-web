import { Container, Card, Placeholder } from "react-bootstrap";
import _ from "lodash";
import colorsCate from "../../config/colorsCate";
import { CardHeader } from "@mui/material";
function LoaderCard() {
  let arrMap = [1, 1, 1, 1, 1, 1];
  return (
    <Container>
      <div className="d-flex flex-row justify-content-center flex-wrap bd-highlight mb-3">
        {_.map(arrMap, (item, index: any) => {
          return (
            <Card
              key={index}
              className="m-4 p-1 bd-highlight shadow rounded"
              style={{ width: "20rem" }}
            >
              <CardHeader
                style={{ backgroundColor: colorsCate[index] }}
              ></CardHeader>
              <Card.Body>
                <Card.Subtitle style={{ height: "5rem" }}></Card.Subtitle>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                  <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                  <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}

export default LoaderCard;
