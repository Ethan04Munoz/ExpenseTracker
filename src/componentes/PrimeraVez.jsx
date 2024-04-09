import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import translations from "../redux/translations";
import { obtenerPrimeraVezVisitandoSitio } from '../FuncionesGlobalesLS';
import Modal from './Modal';

function PrimeraVez() {
    const [mostrarModal, setMostrarModal] = useState(false);

    const language = useSelector(state => state.language.language); // Accede al idioma actual desde el store de Redux

    useEffect(() => {
        const primeraVez = obtenerPrimeraVezVisitandoSitio();
        if (primeraVez) {
            setMostrarModal(true);
        }
    }, []);

    const handleCloseModal = () => {
        setMostrarModal(false);
        // Marcar que el usuario ya no es nuevo visitante
        localStorage.setItem('primeraVezBool', JSON.stringify(false));
    };

    return (
        <div>
        {mostrarModal && (
            <Modal tituloModal={translations[language].configuracionFT} onClickX={handleCloseModal}/>
        )}
        </div>
    );
}

export default PrimeraVez;
