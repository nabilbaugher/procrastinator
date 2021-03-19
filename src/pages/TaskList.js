import React, { useState } from 'react';
import { Card, Header, Input, Button, Popup } from 'semantic-ui-react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { utils } from 'react-modern-calendar-datepicker';
import Task from '../components/Task';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock } from 'react-icons/fi';
import NumberInput from '../components/NumberInput';
import Watermark from '../components/Watermark';
import './TaskList.scss';

//TODO: add delete button for each task
const DEFAULT_DATE = null;
const DEFAULT_HOURS = 2;

const TaskList = ({ tasks, setTasks, daysToComplete, setDaysToComplete }) => {
  const [taskName, setTaskName] = useState('');
  const [selectedDate, setSelectedDate] = useState(DEFAULT_DATE);
  const [selectedHours, setSelectedHours] = useState(DEFAULT_HOURS);

  const renderCustomInput = ({ ref }) => (
    <div className='' ref={ref}>
      <button className='rounded-full cursor-pointer focus:outline-none'>
        <FiCalendar viewBox='0 0 25 25' className='w-10 h-10 p-1 text-emerald-700 hover:text-emerald-600 duration-200'/>
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
      <h1 className='text-center'>Tasks</h1>
      <div centered className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {tasksList}
        <ul className='grid grid-cols-3 gap-2 relative p-5 bg-gray-50 bg-opacity-30 hover:bg-opacity-20 rounded-lg break-words shadow-lg'>
          <input
            type='text'
            className='col-span-3 text-lg focus:outline-none'
            placeholder='Type task name...'
            value={taskName} onChange={handleAddName}
            onKeyDown={handleKeyPress}
          ></input>
          {selectedDate &&
            <div className='col-span-3 my-1'>Due Date: {selectedDate.month}/{selectedDate.day}</div>
          }
          <div className='flex justify-center'>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              renderInput={renderCustomInput}
              calendarClassName=''
              inputPlaceholder='Select due date'
              minimumDate={utils().getToday()}
              colorPrimary="#047857"
            />
          </div>
          {/* <Popup
            content={<NumberInput value={selectedHours} setValue={setSelectedHours} min={1} max={24}/>}
            on='click'
            pinned
            position='bottom center'
            trigger={<Button className='btn tasklist__button'><FiClock className='tasklist__calendar-icon' /></Button>}
          /> */}
          <div className='col-span-2 flex justify-center'>
            <button className='btn' onClick={handleAddTask}>Add Task</button>
          </div>
        </ul>
      </div>
      <div className='text-center m-2 mt-4'>
        {/* <span style={{ fontSize: '1.2em' }}>I have <Input type='number' size='small' value={daysToComplete} onChange={handleChangeDays} style={{ width: '4.5em' }}/> days to complete these tasks.</span> */}
        <span className='tasklist__plan-prompt'>I have <NumberInput value={daysToComplete} setValue={setDaysToComplete} min={1} max={99} /> days to complete these tasks.</span>
      </div>
      <div className='text-center'>
        <Link to='/plan'>
          <button className='btn m-2'>
            Generate Plan
          </button>
        </Link>
      </div>
      <Watermark classname='tasklist__watermark' content='Tasks' size={42} />
    </div>
  )
};

export default TaskList;