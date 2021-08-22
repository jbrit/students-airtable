import { Card } from "react-bootstrap";
import { ClassRecord } from "../constants";

type CardProps = {
  record: ClassRecord;
};

const ClassCard = ({ record }: CardProps) => {
  return (
    <Card body>
      <Card.Title>{record.Name}</Card.Title>
      <Card.Text>{record.Students.join(", ")}</Card.Text>
    </Card>
  );
};

export default ClassCard;
