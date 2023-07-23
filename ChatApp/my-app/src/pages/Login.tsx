import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import React, { useCallback, useState } from "react";
import { baseURL, postRequest } from "../utils/service";

const Login = () => {
  const RowStyle: React.CSSProperties = {
    height: "100vh",
    justifyContent: "center",
    paddingTop: "10%",
  };
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null)
  const [isLoginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState({
    error: false,
    message: "",
  });
  const LogIn = useCallback(async () => {
    setLoginLoading(true);
    const response = await postRequest(
      `${baseURL}/users/login`,
      JSON.stringify(loginInfo)
    );
    console.log(response);
    setLoginLoading(false);

    if (response.error)
      return setLoginError(response)
    console.log("im hereee");
    
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, [loginInfo]);

  return (
    <>
      <Form onSubmit={ (e) => {
         e.preventDefault()
        LogIn()}}>
        <Row style={RowStyle}>
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setLoginInfo((prevData) => ({
                    ...loginInfo,
                    email: e.target.value,
                  }));
                  
                }}
                value={loginInfo.email}
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setLoginInfo((prevData) => ({
                    ...loginInfo,
                    password: e.target.value,
                  }));
                  
                }}
                value={loginInfo.password}
              />
              <Button type="submit" variant="primary">
              {isLoginLoading? "Longin into your account" : "Login"}
              </Button>
              {
              loginError?.error && 
            (<Alert variant="danger">
              <p>{loginError?.message} </p>
            </Alert>)
            }
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
