import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import translations from "../redux/translations";
import Modal from './Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { datosVaciosBoolLS } from '../FuncionesGlobalesLS';

function PrimeraVez() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarPrimeraVez, setMostrarPrimeraVez] = useState(true);    
    const [datosAñadidos, setDatosAñadidos] = useState(false);


    const language = useSelector(state => state.language.language);
    const primeraVez = useSelector(state => state.primeraVez.primeraVez); 

    const dispatch = useDispatch();

    const setearPrimeraVez = () => {
        dispatch({ type: 'CHANGE_FIRSTTIME' });
    };

    useEffect(() => {
        console.log("Primera vez: ", primeraVez)
        //Mostrar la modal porque es la primera vez que visita el sitio
        if (primeraVez == true) {
            setMostrarModal(true);
        }
        //Calcular si mostrar el botón de usar datos de prueba
        //Para ello, debe ser su primera vez en el sitio o debe tener datos vacíos (Probablemente por haberlos borrado)
        const datosVaciosBool = datosVaciosBoolLS();
        const mostrarPrimeraVezProv = datosVaciosBool || primeraVez;
        setMostrarPrimeraVez(mostrarPrimeraVezProv);
    }, []);

    function manejarDatosAñadidos() {
        setDatosAñadidos(true);
    }

    const handleCloseModal = () => {
        setMostrarModal(false);
        console.log("Datos añadidos: ", datosAñadidos)
        setearPrimeraVez();
    };

    useEffect(() => {
        if (datosAñadidos == true) {
            toast.success('¡Los datos de prueba fueron añadidos con éxito!');
            setDatosAñadidos(false);
        } 
    }, [datosAñadidos])

    useEffect(() => {
        console.log("Mostrar: ", mostrarPrimeraVez)
    }, [mostrarPrimeraVez]);

    return (
        <div>
            {mostrarModal && (
                <Modal 
                tituloModal={translations[language].configuracion} 
                onClickX={handleCloseModal} 
                primeraVez={mostrarPrimeraVez}
                onDatosAñadidos={manejarDatosAñadidos}
                desactivarEscape={true}
            />
            )}
        </div>
    );
}

export default PrimeraVez;
