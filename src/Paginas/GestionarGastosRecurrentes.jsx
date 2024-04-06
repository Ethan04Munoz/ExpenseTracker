import React, { useEffect, useState } from 'react';
import { obtenerGastosRecurrentesLS, obtenerIngresosRecurrentesLS } from '../FuncionesGlobalesLS';
import Navbar from '../componentes/Navbar';
import Boton from '../componentes/Boton';

function GestionarGastosRecurrentes() {
    const [gastosRecurrentes, setGastosRecurrentes] = useState([]);

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
                <h1>Gestionar gastos recurrentes</h1>
                {gastosRecurrentes.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Gasto</th>
                                <th>Cantidad</th>
                                <th>Categoría</th>
                                <th>Acciones</th>
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
                                            contenido={gasto.activo ? 'Desactivar' : 'Activar'} 
                                            clase={gasto.activo ? 'Btn BtnRed' : 'Btn BtnGreen'}
                                            onClick={() => {toggleGastoActivo(index)}}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Parece que no tienes gastos recurrentes. Bien ahí :D!</p>
                )}
                
            </div>
        </div>
    );
}

export default GestionarGastosRecurrentes;
