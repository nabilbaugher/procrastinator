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
    <div ref={ref}>
      <Button className='btn tasklist__button'><FiCalendar className='tasklist__calendar-icon' /></Button>
    </div>
  );

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleAddName = (e, data) => {
    setTaskName(data.value);
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
      <Header className='tasklist__header'>Tasks</Header>
      <Card.Group centered className='tasklist__card-container'>
        {tasksList}
        <Card className='secondary'>
          <Card.Content style={{ textAlign: 'center' }}>
            <Input fluid placeholder='Type task name...' value={taskName} onChange={handleAddName} onKeyDown={handleKeyPress} className='secondary' style={{ marginBottom: '.5em' }}></Input>
            {selectedDate &&
              <div style={{ marginBottom: '.5em' }}>Due Date: {selectedDate.month}/{selectedDate.day}</div>
            }
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              renderInput={renderCustomInput}
              calendarClassName='responsive-calendar'
              inputPlaceholder='Select due date'
              minimumDate={utils().getToday()}
              colorPrimary="hsl(183, 31%, 34%)"
            />
            <Popup
              content={<NumberInput value={selectedHours} setValue={setSelectedHours} min={1} max={24}/>}
              on='click'
              pinned
              position='bottom center'
              trigger={<Button className='btn tasklist__button'><FiClock className='tasklist__calendar-icon' /></Button>}
            />
            <Button className='btn' onClick={handleAddTask}>Add Task</Button>
          </Card.Content>
        </Card>
      </Card.Group>
      <div className='tasklist__container'>
        {/* <span style={{ fontSize: '1.2em' }}>I have <Input type='number' size='small' value={daysToComplete} onChange={handleChangeDays} style={{ width: '4.5em' }}/> days to complete these tasks.</span> */}
        <span className='tasklist__plan-prompt'>I have <NumberInput value={daysToComplete} setValue={setDaysToComplete} min={1} max={99} /> days to complete these tasks.</span>
      </div>
      <div className='tasklist__container'>
        <Link to='/plan'>
          <Button className='btn tasklist__plan-btn'>
            Generate Plan
          </Button>
        </Link>
      </div>
      <Watermark classname='tasklist__watermark' content='Thrips' size={35} />
    </div>
  )
};

export default TaskList;