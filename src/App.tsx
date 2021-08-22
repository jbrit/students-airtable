import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getStudentInfo } from "./actions";
import ClassCard from "./components/ClassCard";
import Login from "./components/Login";
import { fetchingStates, ClassRecord } from "./constants";

const App = () => {
  const [dataState, setDataState] = useState<fetchingStates>("idle");
  const [current, setCurrent] = useState<Array<ClassRecord> | null>(null);
  const login = async (name: string) => {
    setDataState("loading");
    const student_info = await getStudentInfo(name);
    setCurrent(student_info);
    setDataState("success");
  };
  const logout = () => {
    setCurrent(null);
    setDataState("idle");
  };
  return (
    <div className="min-vh-100 w-100 bg-light">
      <Container className="h-100">
        {dataState === "idle" && (
          <div className="py-5">
            <Login onSubmit={login} />
          </div>
        )}
        {dataState === "loading" && (
          <div className="d-flex vh-100 align-items-center justify-content-center ">
            Loading...
          </div>
        )}
        {dataState === "success" && (
          <Row>
            <Col className="py-3" xs={12}>
              <Button onClick={() => logout()}>Logout</Button>
            </Col>
            {current ? (
              current?.map((record, idx) => (
                <Col sm={6} className="p-2">
                  <ClassCard key={idx} record={record} />
                </Col>
              ))
            ) : (
              <p>No entry exists</p>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default App;
