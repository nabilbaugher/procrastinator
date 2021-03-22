import React, { useState } from 'react';
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
        className='btn w-7 h-7 inline-flex justify-center items-center relative focus:outline-none disabled:opacity-50 disabled:cursor-auto'
        style={{top: '2px', padding: '0'}}
        onClick={decrement}
        disabled={value === min}
      >
        <FaMinus/>
      </button>
      <span>&nbsp;&nbsp;{value}&nbsp;&nbsp;</span>
      <button
        className='btn w-7 h-7 inline-flex justify-center items-center relative focus:outline-none disabled:opacity-50 disabled:cursor-auto'
        style={{top: '2px', padding: '0'}}
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