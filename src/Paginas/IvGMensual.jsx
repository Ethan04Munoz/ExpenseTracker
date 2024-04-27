import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import '../index.css';
import { Bar } from 'react-chartjs-2';
import translations from '../redux/translations.js';
import { useSelector, useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { generarColorPastelAleatorio, generarDuplaColorPastelBordeRelleno, obtenerAnioActual, obtenerMesActual } from "../FuncionesGlobales";
import { obtenerGastosMesEspecificoLS, obtenerIngresosMesEspecificoLS } from "../FuncionesGlobalesLS";
import PrimeraVez from "../componentes/PrimeraVez.jsx";
import GestorAtajos from "../componentes/GestorAtajos.jsx";


function IvGMensual(){
    const [mesActual, setMesActual] = useState(0);
    const [anioActual, setAnioActual] = useState(0);
    const [ingresos, setIngresos] = useState([]);
    const [gastos, setGastos] = useState([]);
    const [data, setData] = useState({labels: [], datasets: []})

    const language = useSelector(state => state.language.language);

    useEffect(() => {
        setMesActual(obtenerMesActual());
        setAnioActual(obtenerAnioActual());
    }, [])

    useEffect(() => {
        // Aquí debes adaptar las funciones para que devuelvan los arrays actualizados
        console.log("Mes actual: ", mesActual, anioActual)
        setIngresos(obtenerIngresosMesEspecificoLS({mes: mesActual, anio: anioActual}));
        setGastos(obtenerGastosMesEspecificoLS({mes: mesActual, anio: anioActual}));
    }, [mesActual]);


    useEffect(() => {
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
            labels: [translations[language].ingresos, translations[language].gastos],
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
        setData(data);
    }, [gastos, ingresos]);

    useEffect(() => {
        console.log("Data: ", data)
    }, [data])
    
    const options = {
        plugins: { legend: { position: 'top' } }, 
        scales: { 
          x: { stacked: true }, 
          y: { stacked: true } 
        } 
    };

    console.log("Data: ", data)

    return(
        <div className="ivgMensual">
            <Navbar enlaceHeader={"/ExpenseTracker/"}/>
            <PrimeraVez/>
            <GestorAtajos/>
            <h1>{translations[language].ivgMensualBtnMain}</h1>
            {data.datasets.length > 0 ? (
                <Bar data={data} options={options} />
            ) : (
                <div className="formulario">
                    <p>
                        {translations[language].mensajeDataInsuficiente}
                    </p>
                </div>
            )}

        </div>
    )
}

export default IvGMensual;