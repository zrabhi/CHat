import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useCallback, useContext, useEffect, useState } from "react";
import { InputContext, useInputContext } from "../context/AuthContext";
import { baseURL, postRequest } from "../utils/service";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface User {
  email: string;
  name: string;
  token: string;
  id: string;
}

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    token: "",
    id: "",
  });
  const [RegisterDataUser, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const [registerError, setRegisterError] = useState(
    {
      error:false,
      message: "",
  });
  const [isRegisterLoading, setRegisterLoading] = useState(false);

  const registerUser = useCallback(async () => {
    console.log(RegisterDataUser);
    
    setRegisterLoading(true);
    const response = await postRequest(
      `${baseURL}/users/register`,
      JSON.stringify(RegisterDataUser)
    );
    console.log(response);
    
    setRegisterLoading(false);
    if (response.error) return setRegisterError(response);
    localStorage.setItem("User", JSON.stringify(RegisterDataUser));
    setUser(response);
  }, [RegisterDataUser]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("In submit event");
    
    registerUser();
  };

  
  useEffect(() =>
  {
    var user = localStorage.getItem("User");
    if (user)
    {
      const UserData : User = JSON.parse(user);
      setUser(UserData);
      console.log(UserData);
    }    
  },[]);

  return (
    <Form onSubmit={handleSubmit}>
      <Row
        style={{
          height: "100vh",
          justifyContent: "center",
          paddingTop: "10%",
        }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Register</h2>
            <Form.Control
              type="text"
              placeholder="name"
              onChange={(e) => {
                setRegisterData((prevData) => ({
                  ...RegisterDataUser,
                  name: e.target.value,
                }));
              }}
              value={RegisterDataUser.name}
            />
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setRegisterData((prevData) => ({
                  ...RegisterDataUser,
                  email: e.target.value,
                }));
              }}
              value={RegisterDataUser.email}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setRegisterData((prevData) => ({
                  ...RegisterDataUser,
                  password: e.target.value,
                }));
              }}
              value={RegisterDataUser.password}
            />
            <Button type="submit" variant="primary">
              {isRegisterLoading? "Creating your account" : "Register"}
            </Button>
            {
              registerError?.error && 
            (<Alert variant="danger">
              <p>{registerError?.message} </p>
            </Alert>)
            }
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;
