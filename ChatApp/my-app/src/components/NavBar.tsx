import React, { useCallback, useEffect, useState } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
interface data {
  onChange: () => void;
}
const NavBar: React.FC<data> = ({ onChange }) => {
  const [name, setName] = useState(null);

  useEffect(() => {
    var user = localStorage.getItem("User");
    if (user) {
      const UserData = JSON.parse(user);
      setName(UserData.name);
    } else setName(null);
  }, []);

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            ChatApp
          </Link>
        </h2>
        {name && <span className="text-warning">{`Logged in as ${name}`}</span>}
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {name && (
              <Link
                onClick={() => {
                  onChange();
                  setName(null);
                }}
                to="/logout"
                className="link-light text-decoration-none"
              >
                Logout
              </Link>
            )}
            {!name && (
              <>
                <Link to="/login" className="link-light text-decoration-none">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="link-light text-decoration-none"
                >
                  Register
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
