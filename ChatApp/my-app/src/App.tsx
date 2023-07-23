import React, { useCallback, useState } from "react";
import { Routes, Route} from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Login from "./pages/Login";
import './App.css' 
import NavBar from "./components/NavBar";
import { InputContext } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  const [user, setUser] = useState(
   null)
  useEffect(() =>
  {
    var user = localStorage.getItem("User");
    if (user)
    {
      const UserData = JSON.parse(user);
      setUser(UserData);
      console.log(UserData);      
    }
  },[]);

  const logOutUser = useCallback(() =>
  { 
    localStorage.removeItem("User");
    setUser(null);
  },[])

  return (
  <>
    <NavBar onChange={logOutUser}/>
    <Container className="text-secondary">
      <Routes>
        <Route path="/" element={user ? <Chat /> : <Login />} />
        <Route path="/login" element={user ? <Chat /> : <Login />} />
        <Route path="/register" element={ user ? <Chat /> : <Register />} />
        <Route path="*" element={<Chat />} />
      </Routes>
    </Container>
  </>
  );
}

export default App;


