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
import IvGMensual from "./Paginas/IvGMensual";
import MyAreaChart from "./Prueba";
import IvGAnual from "./Paginas/IvGAnual";
import IngresosAnual from "./Paginas/IngresosAnual";
import GastosAnual from "./Paginas/GastosAnual";
import GestionarIngresosRecurrentes from "./Paginas/GestionarIngresosRecurrentes";
import GestionarGastosRecurrentes from "./Paginas/GestionarGastosRecurrentes";

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
        <Route path="/ingresosvsgastos" element={<IvGMensual/>}/>
        <Route path="/ingresosvsgastos/anual" element={<IvGAnual/>}/>
        <Route path="/ingresos/anual" element={<IngresosAnual/>}/>
        <Route path="/gastos/anual" element={<GastosAnual/>}/>
        <Route path="/prueba" element={<MyAreaChart/>}/>
        <Route path="/gestionaringresos" element={<GestionarIngresosRecurrentes/>}/>
        <Route path="/gestionargastos" element={<GestionarGastosRecurrentes/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
