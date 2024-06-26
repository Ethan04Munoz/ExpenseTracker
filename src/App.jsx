import {Route, Routes} from "react-router-dom";
import * as React from "react";
import { HashRouter } from "react-router-dom";
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
import FullGastos from "./Paginas/FullGastos";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullIngresos from "./Paginas/FullIngresos";
import Informacion from "./Paginas/Información";

function App() {
  return (
    <HashRouter>
      <ToastContainer position="bottom-left" />
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/ingresos" element={<Ingresos/>}/>
        <Route path="/ingresos/detalles" element={<FullIngresos/>}/>
        <Route path="/gastos" element={<Gastos/>}/>
        <Route path="/gastos/detalles" element={<FullGastos/>}/>
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
        <Route path="/informacion" element={<Informacion/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
