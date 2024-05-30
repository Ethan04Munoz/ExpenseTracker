import React, { useEffect, useState } from 'react';
import './Modal.css';
import { useSelector, useDispatch } from 'react-redux';
import translations from '../redux/translations.js';
import { setCurrency } from '../redux/CurrencyActions.js';
import monetarySymbols from '../redux/monetarySymbols.js';
import Switch from './Switch.jsx';
import { datosVaciosBoolLS, eliminarDatos, establecerDatosPrueba } from '../FuncionesGlobalesLS.js';
import Boton from './Boton.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal2 from './Modal2.jsx';

function Modal(props) {
    let navigate = useNavigate();
    const location = useLocation();

    const language = useSelector(state => state.language.language);
    const dispatch = useDispatch();

    const cambiarIdioma = () => {
        dispatch({ type: 'CHANGE_LANGUAGE' });
    };

    const currentSymbol = useSelector((state) => state.currency.currencySymbol);

    const handleChangeCurrency = (event) => {
        dispatch(setCurrency(event.target.value));
    };

    const primeraVez = props.primeraVez;

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                props.onClickX && props.onClickX();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [props.onClickX]);

    const [mostrarModalEstasSeguro, setMostrarModalEstasSeguro] = useState(false);
    const [habilitarBotonEliminar, setHabilitarBotonEliminar] = useState(false);
    const [textoHabilitarBotonEliminar, setTextoHabilitarBotonEliminar] = useState('');
    const [claseBotonEliminar, setClaseBotonEliminar] = useState('Btn BtnDis');

    function establecerDatosPruebaLcl() {
        props.onDatosAñadidos();
        console.log("Estado de datosAñadidos")
        establecerDatosPrueba();
        if (props.onClickX) {
            props.onClickX();
        }
    }

    function apagarModalEstasSeguro() {
        setMostrarModalEstasSeguro(false);
    }

    function eliminarDatosLcl() {
        setMostrarModalEstasSeguro(true);
    }

    function eliminarDatosLS() {
        eliminarDatos();
        if (location.pathname == "/") {
            window.location.reload();
        } else {
            navigate("/");
        }
    }

    function guardarTextoHabilitarBoton(e) {
        setTextoHabilitarBotonEliminar(e.target.value)
        datosVaciosBoolLS();
    }

    useEffect(() => {
        if (textoHabilitarBotonEliminar == "Quiero eliminar mi informacion") {
            setHabilitarBotonEliminar(false);
            setClaseBotonEliminar("Btn BtnRed")
        } else {
            setHabilitarBotonEliminar(true);
            setClaseBotonEliminar("Btn BtnDis")
        }
    }, [textoHabilitarBotonEliminar])

    return (
        <div className="modal">
            <div className='modalAdv'>
                {(props.onClickX != null) ? (
                    <div className="aLaDerechaConGrid">
                        <button className='btnCerrarModal' onClick={props.onClickX}>X</button>
                    </div>
                ) : null}
                <h2>{props.tituloModal}</h2>
                {(props.tituloModal == "Ajustes" || props.tituloModal == "Settings" || props.tituloModal == "Personaliza tu experiencia" || props.tituloModal == "Customize Your Experience") && (
                    <>
                        <div className='gridConfiguracion'>
                            <div>{translations[language].idioma}</div>
                            <div className='gridInterruptor'>
                                {translations[language].espanol}
                                <Switch onChangeProp={cambiarIdioma} />
                                {translations[language].ingles}
                            </div>
                            <div>{translations[language].moneda}</div>
                            <div className='selectContainer'>
                                <select className='selectConfig' value={currentSymbol} onChange={handleChangeCurrency}>
                                    {Object.entries(monetarySymbols).map(([key, symbol]) => (
                                        <option key={key} value={symbol}>
                                            {symbol}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div></div>
                            <div></div>
                        </div>
                        {(primeraVez == true) ? (
                            <div >
                                <Boton
                                    onClick={establecerDatosPruebaLcl}
                                    clase="Btn BtnDark"
                                    contenido={translations[language].configEstablecerDatosPrueba}
                                />
                            </div>
                        ) : (
                            <div>
                                <Boton
                                    onClick={eliminarDatosLcl}
                                    clase="Btn BtnRed"
                                    contenido={translations[language].configBorrarInfo}
                                />
                            </div>
                        )}
                    </>
                )}
                {props.onClick && (
                    <button className={manejarClaseBotonReiniciar()} onClick={props.onClick}>
                        {translations[language].botonReiniciarJuego}
                    </button>
                )}
                {mostrarModalEstasSeguro && (
                    <Modal2 onClickX={apagarModalEstasSeguro}>
                        <h2>¿Estás seguro?</h2>
                        <p>Esto eliminará toda tu información. Esta acción no se puede deshacer.</p>
                        <p>Para confirmar, escribe <span className='span'>Quiero eliminar mi informacion</span> en el siguiente campo:</p>
                        <input type="text" name="" id="" className='input' value={textoHabilitarBotonEliminar} onChange={guardarTextoHabilitarBoton} />
                        <Boton contenido="Eliminar toda mi información" disabled={habilitarBotonEliminar} clase={claseBotonEliminar} onClick={eliminarDatosLS} />
                    </Modal2>
                )}
            </div>
        </div>
    )
}

export default Modal;