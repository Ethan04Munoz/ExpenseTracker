import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import '../index.css';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { generarColorPastelAleatorio, generarDuplaColorPastelBordeRelleno, obtenerMesActual } from "../FuncionesGlobales";
import { obtenerGastosMesEspecificoLS, obtenerIngresosMesEspecificoLS } from "../FuncionesGlobalesLS";

function IvGMensual(){
    const [mesActual, setMesActual] = useState(0);
    const [ingresos, setIngresos] = useState([]);
    const [gastos, setGastos] = useState([]);

    useEffect(() => {
        setMesActual(obtenerMesActual())
    }, [])

    useEffect(() => {
        // Aquí debes adaptar las funciones para que devuelvan los arrays actualizados
        setIngresos(obtenerIngresosMesEspecificoLS(mesActual));
        setGastos(obtenerGastosMesEspecificoLS(mesActual));
    }, [mesActual]);


    // Preparar los datos para el gráfico
    const categoriasIngresos = [...new Set(ingresos.map(item => item.categoria))];
    const categoriasGastos = [...new Set(gastos.map(item => item.categoria))];

    const dataIngresos = categoriasIngresos.map(cat => 
        ingresos.filter(ing => ing.categoria === cat).reduce((acc, curr) => acc + parseFloat(curr.cantidad), 0)
    );

    const dataGastos = categoriasGastos.map(cat => 
        gastos.filter(gas => gas.categoria === cat).reduce((acc, curr) => acc + parseFloat(curr.cantidad), 0)
    );

    const data = {
        labels: ['Ingresos', 'Gastos'],
        datasets: [
            ...categoriasIngresos.map((categoria, index) => {
                const { colorRelleno, colorBorde } = generarDuplaColorPastelBordeRelleno();
                return {
                    label: categoria,
                    data: index === 0 ? [dataIngresos[index], null] : [null, dataIngresos[index]],
                    backgroundColor: colorRelleno,
                    borderColor: colorBorde,
                    borderWidth: 1,
                };
            }),
            ...categoriasGastos.map((categoria, index) => {
                const { colorRelleno, colorBorde } = generarDuplaColorPastelBordeRelleno();
                return {
                    label: categoria,
                    data: index === 0 ? [null, dataGastos[index]] : [null, dataGastos[index]],
                    backgroundColor: colorRelleno,
                    borderColor: colorBorde,
                    borderWidth: 1,
                };
            })
        ],
    };
    

    const options = {
        plugins: { legend: { position: 'top' } }, 
        scales: { 
          x: { stacked: true }, 
          y: { stacked: true } 
        } 
    };

    return(
        <div className="ivgMensual">
            <Navbar enlaceHeader={"/"}/>
            <h1>Ingresos vs egresos este mes</h1>
            <Bar data={data} options={options} />
        </div>
    )
}

export default IvGMensual;