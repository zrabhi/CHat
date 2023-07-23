import React, { useState } from "react";
import { Routes, Route} from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Login from "./pages/Login";
import './App.css' 
import NavBar from "./components/NavBar";
import { InputContext } from "./context/AuthContext";

function App() {
  
  return (
  <>
    <NavBar />
    <Container className="text-secondary">
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Chat />} />
      </Routes>
    </Container>
  ç
  </>
  );
}

export default App;


