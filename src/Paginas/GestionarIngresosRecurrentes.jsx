import React, { useEffect, useState } from 'react';
import { obtenerIngresosRecurrentesLS } from '../FuncionesGlobalesLS';
import Navbar from '../componentes/Navbar';
import Boton from '../componentes/Boton';
import translations from '../redux/translations.js';
import { useSelector, useDispatch } from 'react-redux';
import PrimeraVez from '../componentes/PrimeraVez.jsx';

function GestionarIngresosRecurrentes() {
    const [ingresosRecurrentes, setIngresosRecurrentes] = useState([]);

    const language = useSelector(state => state.language.language);

    useEffect(() => {
        setIngresosRecurrentes(obtenerIngresosRecurrentesLS());
    }, []);

    const toggleIngresoActivo = (indice) => {
        const nuevosIngresos = [...ingresosRecurrentes];
        nuevosIngresos[indice].activo = !nuevosIngresos[indice].activo;
        setIngresosRecurrentes(nuevosIngresos);
        localStorage.setItem('ingresosRecurrentes', JSON.stringify(nuevosIngresos));
    };

    return (
        <div className="gestionarIngresosRecurrentes">
            <Navbar enlaceHeader={"/"}/>
            <PrimeraVez/>
            <div className="formulario">
                <h1>{translations[language].gestionarIngresosBtnMain}</h1>
                {ingresosRecurrentes.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                            <th>{translations[language].tituloTablaIngreso}</th>
                                <th>{translations[language].tituloTablaCantidad}</th>
                                <th>{translations[language].tituloTablaCategoria}</th>
                                <th>{translations[language].tituloTablaAcciones}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingresosRecurrentes.map((ingreso, index) => (
                                <tr key={index}>
                                    <td>{ingreso.ingreso}</td>
                                    <td>{ingreso.cantidad}</td>
                                    <td>{ingreso.categoria}</td>
                                    <td className='tdBtn'>
                                        <Boton 
                                            contenido={gasto.activo ? translations[language].tituloBtnTablaDesactivar : translations[language].tituloBtnTablaActivar} 
                                            clase={ingreso.activo ? 'Btn BtnRed' : 'Btn BtnGreen'}
                                            onClick={() => {toggleIngresoActivo(index)}}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>{translations[language].tablaGestionIngresosMensaje}</p>
                )}
                
            </div>
        </div>
    );
}

export default GestionarIngresosRecurrentes;
