import React, { useCallback, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Login from "./pages/Login";
import "./App.css";
import NavBar from "./components/NavBar";
import { InputContext } from "./context/AuthContext";
import { useEffect } from "react";
import {
  ChatContextProvider,
  ChatContextState,
  User,
} from "./context/chatContext";

function App() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    token: "",
    _id: "",
  });

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("User");
    if (userDataFromLocalStorage) {
      try {
        const userData = JSON.parse(userDataFromLocalStorage);
        setUser(userData);
        console.log("user data:", userData);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const logOutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser({} as User);
  }, []);

  console.log("before return user" + user);
  return (
    <ChatContextProvider user={user}>
      <NavBar onChange={logOutUser} />
      <Container className="text-secondary">
        <Routes>
          <Route path="/" element={user.email ? <Chat user={user}/> : <Login />} />
          <Route path="/login" element={user.email ? <Chat user={user} /> : <Login />} />
          <Route
            path="/register"
            element={user.email ? <Chat user={user}/> : <Register />}
          />
          <Route path="*" element={<Chat user={user}/>} />
        </Routes>
      </Container>
    </ChatContextProvider>
  );
}

export default App;
