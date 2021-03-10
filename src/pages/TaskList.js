import React, { useState } from 'react';
import { Card, Header, Input, Button } from 'semantic-ui-react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { utils } from 'react-modern-calendar-datepicker';
import Task from '../components/Task';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { VscCalendar } from 'react-icons/vsc';
import Watermark from '../components/Watermark';
import './TaskList.scss';

//TODO: add delete button for each task

const TaskList = ({ tasks, setTasks, daysToComplete, setDaysToComplete }) => {
  const [taskName, setTaskName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const renderCustomInput = ({ ref }) => (
    <div ref={ref}>
      <Button className='btn tasklist__button'><VscCalendar className='tasklist__calendar-icon'/></Button>
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
      return [...prevtasks, { id: uuidv4(), name: taskName, dueDate: date }]
    });
    setTaskName('');
    setSelectedDate(null);
  };

  const handleChangeDays = (e, data) => {
    setDaysToComplete(data.value);
  };

  const tasksList = tasks.map(task => {
    return <Task key={task.id} id={task.id} name={task.name} dueDate={task.dueDate} setTasks={setTasks} />
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
              calendarClassName='btn responsive-calendar'
              inputPlaceholder='Select due date'
              minimumDate={utils().getToday()}
              colorPrimary="hsl(183, 31%, 34%)"
            />
            <Button className='btn' onClick={handleAddTask}>Add Task</Button>
          </Card.Content>
        </Card>
      </Card.Group>
      <div className='tasklist__container--right'>
        <span style={{ fontSize: '1.2em' }}>I have <Input type='number' size='small' value={daysToComplete} onChange={handleChangeDays} style={{ width: '4.5em' }}/> days to complete these tasks.</span>
        <Link to='/plan'>
          <Button className='btn tasklist__plan-btn' floated='right' style={{ marginLeft: '1em' }}>
            Generate Plan
          </Button>
        </Link>
      </div>
      {/* <Watermark content='Procrast' size={45}/> */}
    </div>
  )
};

export default TaskList;