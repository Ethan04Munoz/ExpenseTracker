import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import './Switch.css'

const Switch = ({ onSelectionChange, onChangeProp }) => {
  const idiomaParametro = useSelector(state => state.language.language);
  const [activadoDesactivado, setActivadoDesactivado] = useState(false);

  useEffect(() => {
    console.log("Instant sales: ", idiomaParametro)
    if(idiomaParametro=="es")
      setActivadoDesactivado(false);
    if(idiomaParametro=="en")
      setActivadoDesactivado(true);
  }, [idiomaParametro]);
  
  const handleOptionChange = () => {
    setActivadoDesactivado(!activadoDesactivado);
    onSelectionChange && onSelectionChange(!activadoDesactivado ? 'es' : 'en');
  };

  const handleOnChange = (event) => {
    handleOptionChange();
    onChangeProp && onChangeProp(event);
  };

  const [claseSlider, setClaseSlider] = useState('slider sliderColores round');

  return (
    <div className="instant-sales-container">
      <label className="switch">
        <input
          type="checkbox"
          checked={activadoDesactivado}
          onChange={handleOnChange}
        />
        <span className={claseSlider}></span>
      </label>
    </div>
  );
};

export default Switch;