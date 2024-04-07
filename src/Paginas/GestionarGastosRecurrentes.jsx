import React, { useEffect, useState } from 'react';
import { obtenerGastosRecurrentesLS, obtenerIngresosRecurrentesLS } from '../FuncionesGlobalesLS';
import Navbar from '../componentes/Navbar';
import Boton from '../componentes/Boton';
import translations from '../redux/translations.js';
import { useSelector, useDispatch } from 'react-redux';

function GestionarGastosRecurrentes() {
    const [gastosRecurrentes, setGastosRecurrentes] = useState([]);

    const language = useSelector(state => state.language.language);


    useEffect(() => {
        setGastosRecurrentes(obtenerGastosRecurrentesLS());
    }, []);

    const toggleGastoActivo = (indice) => {
        const nuevosIngresos = [...gastosRecurrentes];
        nuevosIngresos[indice].activo = !nuevosIngresos[indice].activo;
        setGastosRecurrentes(nuevosIngresos);
        localStorage.setItem('gastosRecurrentes', JSON.stringify(nuevosIngresos));
    };

    return (
        <div className="gestionarGastosRecurrentes">
            <Navbar enlaceHeader={"/"}/>
            <div className="formulario">
                <h1>{translations[language].gestionarGastosBtnMain}</h1>
                {gastosRecurrentes.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>{translations[language].tituloTablaGasto}</th>
                                <th>{translations[language].tituloTablaCantidad}</th>
                                <th>{translations[language].tituloTablaCategoria}</th>
                                <th>{translations[language].tituloTablaAcciones}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gastosRecurrentes.map((gasto, index) => (
                                <tr key={index}>
                                    <td>{gasto.gasto}</td>
                                    <td>{gasto.cantidad}</td>
                                    <td>{gasto.categoria}</td>
                                    <td className='tdBtn'>
                                        <Boton 
                                            contenido={gasto.activo ? translations[language].tituloBtnTablaDesactivar : translations[language].tituloBtnTablaActivar} 
                                            clase={gasto.activo ? 'Btn BtnRed' : 'Btn BtnGreen'}
                                            onClick={() => {toggleGastoActivo(index)}}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>{translations[language].tablaGestionGastosMensaje}</p>
                )}
                
            </div>
        </div>
    );
}

export default GestionarGastosRecurrentes;
