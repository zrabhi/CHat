import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import React from "react";

const Login = () => {
  const RowStyle: React.CSSProperties = {
    height: "100vh",
    justifyContent: "center",
    paddingTop: "10%",
  };

  return (
    <>
      <Form>
        <Row style={RowStyle}>
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control type="email" placeholder="Email" />
              <Form.Control type="password" placeholder="Password" />
              <Button type="submit" variant="primary">
                Login
              </Button>
              <Alert variant="danger">
                <p>All Fields are required</p>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
