import React from 'react';
import './ButtonNeonArrow.css'; // Asegúrate de importar el CSS
//import 'bootstrap-icons/font/bootstrap-icons.css';

/*
    * De momento este componente no se utiliza en el proyecto, la idea es que muestre una flecha en lugar de un texto
*/

const NeonArrowButton = ({ direction, onClick, textoBtnIzq, textoBtnDer }) => {
  return (
    <button className={`neon-button ${direction}`} onClick={onClick}>
      {/* Aquí podrías insertar tu ícono de flecha, por ejemplo, usando FontAwesome */}
      {/* <i className="fa fa-arrow-right"></i> */} 
      {direction == "right" ? <p>{textoBtnDer}</p> : <p>{textoBtnIzq}</p>}
      {/*<i class="bi bi-arrow-right-square-fill"></i>*/}
    </button>
  );
};

export default NeonArrowButton;
