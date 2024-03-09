import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import './App.css';
import Main from "./Paginas/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
