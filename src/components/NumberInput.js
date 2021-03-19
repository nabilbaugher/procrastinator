import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { FaPlus, FaMinus } from 'react-icons/fa';
// import './NumberInput.scss'

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
    <span className='text-center'>
      &nbsp;
      <button
        className='bg-emerald-700 text-white duration-200 w-7 h-7 rounded-full inline-flex justify-center items-center relative hover:bg-emerald-600 focus:outline-none disabled:opacity-50 disabled:cursor-auto'
        style={{top: '2px'}}
        onClick={decrement}
        disabled={value === min}
      >
        <FaMinus className='numberinput__icon' />
      </button>
      <span classname='numberinput__value'>&nbsp;&nbsp;{value}&nbsp;&nbsp;</span>
      <button
        className='bg-emerald-700 text-white w-7 h-7 rounded-full inline-flex justify-center items-center relative hover:bg-emerald-600 focus:outline-none disabled:opacity-50 disabled:cursor-auto'
        style={{top: '2px'}}
        onClick={increment}
        disabled={value === max}
      >
        <FaPlus className='numberinput__icon' />
      </button>
      &nbsp;
    </span>
  );
};

export default NumberInput;