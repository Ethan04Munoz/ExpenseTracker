import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
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
        <Route path="/ExpenseTracker/" element={<Main/>}/>
        <Route path="/ExpenseTracker/ingresos" element={<Ingresos/>}/>
        <Route path="/ExpenseTracker/gastos" element={<Gastos/>}/>
        <Route path="/ExpenseTracker/nuevacategoriaingresos" element={<AddCategoriaIngresos/>}/>
        <Route path="/ExpenseTracker/nuevacategoriagastos" element={<AddCategoriaGastos/>}/>
        <Route path="/ExpenseTracker/misingresosesteaño" element={<IngresosEsteAño/>}/>
        <Route path="/ExpenseTracker/misgastosesteaño" element={<GastosEsteAño/>}/>
        <Route path="/ExpenseTracker/ingresosvsgastos" element={<IvGMensual/>}/>
        <Route path="/ExpenseTracker/ingresosvsgastos/anual" element={<IvGAnual/>}/>
        <Route path="/ExpenseTracker/ingresos/anual" element={<IngresosAnual/>}/>
        <Route path="/ExpenseTracker/gastos/anual" element={<GastosAnual/>}/>
        <Route path="/ExpenseTracker/prueba" element={<MyAreaChart/>}/>
        <Route path="/ExpenseTracker/gestionaringresos" element={<GestionarIngresosRecurrentes/>}/>
        <Route path="/ExpenseTracker/gestionargastos" element={<GestionarGastosRecurrentes/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
