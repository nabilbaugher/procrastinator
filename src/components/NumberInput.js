import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './NumberInput.scss'

const NumberInput = ({ value, setValue, min, max }) => {
  const increment = () => {
    if (value !== max) {
      setValue(value + 1);
    }
  }
  
  const decrement = () => {
    if (value !== min) {
      setValue(value - 1);
    }
  }

  return (
    <span className='numberinput'>
      &nbsp;
      <button className='btn numberinput__btn' size='mini' onClick={decrement}>
        <FaMinus className='numberinput__icon' />
      </button>
      <span classname='numberinput__value'>&nbsp;&nbsp;{value}&nbsp;&nbsp;</span>
      <button className='btn numberinput__btn' size='mini' onClick={increment}>
        <FaPlus className='numberinput__icon' />
      </button>
      &nbsp;
    </span>
  );
};

export default NumberInput;