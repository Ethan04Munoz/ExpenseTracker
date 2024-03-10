import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import './App.css';
import Main from "./Paginas/Main";
import Ingresos from "./Paginas/Ingresos";
import AddCategoriaIngresos from "./Paginas/AddCategoriaIngresos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/ingresos" element={<Ingresos/>}/>
        <Route path="/nuevacategoriaingresos" element={<AddCategoriaIngresos/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
