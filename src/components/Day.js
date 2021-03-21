import React from 'react';
import { v4 as uuidv4 } from 'uuid';
// import './Day.scss';

const Day = ({ dayNumber, dayTasks }) => {
  const listOfTasks = dayTasks.map((task, idx) => {

    return (
      <div key={uuidv4()} className='p-5 w-full whitespace-nowrap bg-gray-50 bg-opacity-20 hover:bg-opacity-10 rounded-lg shadow-lg'>
        <div className={`text-2xl ${idx === 0 && 'font-medium'}`}>
          {task.name}
          <span className='float-right text-gray-700'>{task.dueDate ? task.dueDate.getMonth() + '/' + task.dueDate.getDate() : null}</span>
        </div>
        {/* <div className='text-lg'>~{task.hoursToComplete} hours</div> */}
      </div>
    );
  });

  return (
    <ul className='p-5 bg-gray-50 bg-opacity-10 rounded-lg shadow-lg'>
      <div style={{ fontSize: '2rem' }} className='font-medium text-center mt-3 mb-7'>Day {dayNumber}</div>
      {/* <div className='h-1 m-4 bg-emerald-700 '/ */}
      <div className='flex flex-wrap gap-y-4 justify-center'>
        {listOfTasks}
      </div>
    </ul>
  )
};

export default Day;