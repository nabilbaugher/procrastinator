import React, { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { utils } from 'react-modern-calendar-datepicker';
import Task from '../components/Task';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock } from 'react-icons/fi';
import NumberInput from '../components/NumberInput';
import Watermark from '../components/Watermark';
// import './TaskList.scss';

//TODO: add delete button for each task
const DEFAULT_DATE = null;
const DEFAULT_HOURS = 2;

const TaskList = ({ tasks, setTasks, daysToComplete, setDaysToComplete }) => {
  const [taskName, setTaskName] = useState('');
  const [selectedDate, setSelectedDate] = useState(DEFAULT_DATE);
  const [selectedHours, setSelectedHours] = useState(DEFAULT_HOURS);

  const renderCustomInput = ({ ref }) => (
    <div className='mr-1.5' ref={ref}>
      <button className='btn cursor-pointer focus:outline-none'>
        <FiCalendar viewBox='0 0 25 25' className='w-10 h-10 p-1.5 text-emerald-700 hover:text-emerald-600 duration-200'/>
      </button>
    </div>
  );

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleAddName = (e) => { 
    setTaskName(e.target.value);
  };

  const handleAddTask = (e) => {
    if (taskName === '') {
      return;
    }
    setTasks(prevtasks => {
      let date = null;
      if (selectedDate) {
        date = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
      }
      return [...prevtasks, { id: uuidv4(), name: taskName, dueDate: date, hoursToComplete: selectedHours}]
    });
    setTaskName('');
    setSelectedDate(DEFAULT_DATE);
    setSelectedHours(DEFAULT_HOURS);
  };

  // const handleChangeDays = (e, data) => {
  //   setDaysToComplete(data.value);
  // };

  const tasksList = tasks.map(task => {
    return <Task key={task.id} id={task.id} name={task.name} dueDate={task.dueDate} hoursToComplete={task.hoursToComplete} setTasks={setTasks} />
  });

  return (
    <div className='tasklist'>
      <h1 className='text-center font-medium mb-4' style={{ fontSize: '3.5rem' }}>Assignments</h1>
      <div centered className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {tasksList}
        <div className='relative p-5 bg-gray-50 bg-opacity-30 hover:bg-opacity-20 rounded-lg break-words shadow-lg'>
          <input
            type='text'
            className='w-full text-lg focus:outline-none'
            placeholder='Type task name...'
            value={taskName} onChange={handleAddName}
            onKeyDown={handleKeyPress}
          ></input>
          {selectedDate &&
            <div className='my-1'>Due Date: {selectedDate.month}/{selectedDate.day}</div>
          }
          <div className='flex justify-center pt-3'>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              renderInput={renderCustomInput}
              calendarClassName=''
              inputPlaceholder='Select due date'
              minimumDate={utils().getToday()}
              colorPrimary="#047857"
            />
          {/* <Popup
            content={<NumberInput value={selectedHours} setValue={setSelectedHours} min={1} max={24}/>}
            on='click'
            pinned
            position='bottom center'
            trigger={<Button className='btn tasklist__button'><FiClock className='tasklist__calendar-icon' /></Button>}
          /> */}
            <button className='btn pad ml-1.5' onClick={handleAddTask}>Add Assignment</button>
          </div>
        </div>
      </div>
      <div className='text-center'>
        <div className='text-center my-6 inline-block bg-gray-50 bg-opacity-30 py-3 px-5 rounded-lg shadow-lg'>
          <span className='text-xl mr-2 hidden sm:inline'>I have <NumberInput value={daysToComplete} setValue={setDaysToComplete} min={1} max={99} /> days to complete these assignments.</span>
          <div className='text-xl mr-2 sm:hidden mb-3'>I have <NumberInput value={daysToComplete} setValue={setDaysToComplete} min={1} max={99} /> days to complete these assignments.</div>
          <Link to='/plan'>
            <button className='btn pad ml-2'>
              Generate Plan
            </button>
          </Link>
        </div>
      </div>
      {/* <Watermark classname='tasklist__watermark' content='Tasks' size={42} /> */}
    </div>
  )
};

export default TaskList;