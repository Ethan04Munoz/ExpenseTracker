import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import translations from "../redux/translations";
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PrimeraVez() {
    const [mostrarModal, setMostrarModal] = useState(false);

    const language = useSelector(state => state.language.language);
    const primeraVez = useSelector(state => state.primeraVez.primeraVez); 

    const dispatch = useDispatch();

    const setearPrimeraVez = () => {
        dispatch({ type: 'CHANGE_FIRSTTIME' });
    };

    useEffect(() => {
        console.log("Primera vez: ", primeraVez)
        if (primeraVez == true) {
            setMostrarModal(true);
        }
    }, []);

    const handleCloseModal = () => {
        setMostrarModal(false);
        toast.success('¡Los datos de prueba fueron añadidos con éxito!');
        setearPrimeraVez();
    };

    return (
        <div>
            <ToastContainer position="bottom-left" />
            {mostrarModal && (
                <Modal tituloModal={translations[language].configuracionFT} onClickX={handleCloseModal} primeraVez={true} />
            )}
        </div>
    );
}

export default PrimeraVez;
