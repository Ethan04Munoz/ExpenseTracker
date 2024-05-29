import React, { useEffect, useState } from 'react';
import './Modal.css';
import { useSelector, useDispatch } from 'react-redux';
import translations from '../redux/translations.js';
import { setCurrency } from '../redux/CurrencyActions.js';
import monetarySymbols from '../redux/monetarySymbols.js';
import Switch from './Switch.jsx';
import { eliminarDatos, establecerDatosPrueba } from '../FuncionesGlobalesLS.js';
import Boton from './Boton.jsx';

function Modal(props) {
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

    function establecerDatosPruebaLcl(){
        establecerDatosPrueba();
        if (props.onClickX) {
            props.onClickX();
        }
    }

    function eliminarDatosLcl(){

    }

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
                                    clase="Btn BtnDark"
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
            </div>
        </div>
    )
}

export default Modal;