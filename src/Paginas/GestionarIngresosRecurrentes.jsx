import React, { useEffect, useState } from 'react';
import { obtenerIngresosRecurrentesLS } from '../FuncionesGlobalesLS';
import Navbar from '../componentes/Navbar';
import Boton from '../componentes/Boton';

function GestionarIngresosRecurrentes() {
    const [ingresosRecurrentes, setIngresosRecurrentes] = useState([]);

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
            <div className="formulario">
                <h1>Gestionar ingresos recurrentes</h1>
                {ingresosRecurrentes.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Ingreso</th>
                                <th>Cantidad</th>
                                <th>Categoría</th>
                                <th>Acciones</th>
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
                                            contenido={ingreso.activo ? 'Desactivar' : 'Activar'} 
                                            clase={ingreso.activo ? 'Btn BtnRed' : 'Btn BtnGreen'}
                                            onClick={() => {toggleIngresoActivo(index)}}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Parece que no tienes ingresos recurrentes. Pero yo sé que pronto los tendrás, no te desanimes :D!</p>
                )}
                
            </div>
        </div>
    );
}

export default GestionarIngresosRecurrentes;
