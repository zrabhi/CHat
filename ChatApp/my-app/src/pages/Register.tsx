import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useCallback, useContext, useState } from "react";
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

  const [registerError, setRegisterError] = useState(null!);
  const [isRegisterLoading, setRegisterLoading] = useState(false);


  const  registerUser = useCallback(async() =>{
      const response = await postRequest(`${baseURL}/users/register`, JSON.stringify(RegisterDataUser))

      if (response.error)
        return setRegisterError(response);
      localStorage.setItem('User', JSON.stringify(RegisterDataUser))
  
  
    },[])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your registration logic here
  };

  return (
    <Form>
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
            />
            <Button type="submit" variant="primary">
              Register
            </Button>
            <Alert variant="danger">
              <p>All Fields are required</p>
            </Alert>
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;
