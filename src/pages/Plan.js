import React, { useState, useEffect } from 'react';
import Day from '../components/Day';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
// import Watermark from '../components/Watermark';
// import './Plan.scss';

const Plan = ({ tasks, daysToComplete }) => {
  useEffect(() => {
    if (tasks.length === 0) {
      window.alert('Add tasks before generating a plan.');
    }
  }, []);

  const [sortedTasks, setSortedTasks] = useState([]);
  const [dividedTasks, setDividedTasks] = useState([]);
  const [width, setWidth] = useState(4);

  useEffect(() => {
    setSortedTasks(() => {
      return tasks.slice().sort((a, b) => {
        if (a.dueDate && b.dueDate) {
          return a.dueDate - b.dueDate;
        } if (a.dueDate) {
          return -1;
        } if (b.dueDate) {
          return 1;
        }
        return Math.random() * 2 - 1;
      });
    })

    if (daysToComplete === 3) {
      setWidth(5);
    } if (daysToComplete <= 2) {
      setWidth(8);
    }
  }, []);
  
  useEffect(() => {
    setDividedTasks([]);
    for (let day = 0; day < daysToComplete; day++) {
      setDividedTasks(prevDividedTasks => {
        return [...prevDividedTasks, []]
      });
    }
    
    if (dividedTasks.length > 0) {
      for (let i = 0; i < sortedTasks.length; i++) {
        setDividedTasks(prevDividedTasks => {
          const result = prevDividedTasks.slice();
          result[Math.floor(i/(sortedTasks.length/daysToComplete))].push(sortedTasks[i]);
          return result;
        });
      }
    }
  }, [sortedTasks]);

  const daysList = dividedTasks.map((dayTasks, idx) => {
    return (
      <div className='w-full lg:w-1/2 p-2' key={uuidv4()}>
        <Day dayTasks={dayTasks} dayNumber={idx + 1}/>
      </div>
    );
  });

  return (
    <div className='plan'>
      <h1 className='text-center font-medium' style={{ fontSize: '3.5rem' }}>Plan</h1>
      <div className='flex flex-wrap justify-center'>
        {daysList}
      </div>
      <div className='text-center'>
        <Link to='/#'>
          <button className='btn pad my-5'>Back to Tasks</button>
        </Link>
      </div>
      {/* <Watermark className='plan__watermark' content='Plan' size={40} /> */}
    </div>
  )
}

export default Plan;