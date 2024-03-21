import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import './App.css';
import Main from "./Paginas/Main";
import Ingresos from "./Paginas/Ingresos";
import AddCategoriaIngresos from "./Paginas/AddCategoriaIngresos";
import AddCategoriaGastos from "./Paginas/AddCategoriaGastos";
import Gastos from "./Paginas/Gastos";
import IngresosEsteAño from "./Paginas/IngresosAño";
import GastosEsteAño from "./Paginas/GastosAño";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/ingresos" element={<Ingresos/>}/>
        <Route path="/gastos" element={<Gastos/>}/>
        <Route path="/nuevacategoriaingresos" element={<AddCategoriaIngresos/>}/>
        <Route path="/nuevacategoriagastos" element={<AddCategoriaGastos/>}/>
        <Route path="/misingresosesteaño" element={<IngresosEsteAño/>}/>
        <Route path="/misgastosesteaño" element={<GastosEsteAño/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
