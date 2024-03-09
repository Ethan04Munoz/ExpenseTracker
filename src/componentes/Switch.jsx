import React, { useState, useEffect } from 'react';
import './Switch.css'

const Switch = ({ onSelectionChange, onChangeProp, instantSalesParametro }) => {
  const [instantSales, setInstantSales] = useState(instantSalesParametro || false);

  // Si initialValue cambia, actualiza el estado instantSales
  useEffect(() => {
    setInstantSales(instantSalesParametro);
  }, [instantSalesParametro]);
  
  const handleOptionChange = () => {
    setInstantSales(!instantSales);
    onSelectionChange && onSelectionChange(!instantSales ? 'si' : 'no');
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
          checked={instantSales}
          onChange={handleOnChange}
        />
        <span className={claseSlider}></span>
      </label>
    </div>
  );
};

export default Switch;