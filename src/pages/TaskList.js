import React, { useState } from 'react';
import { Card, Header, Input, Button } from 'semantic-ui-react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { utils } from 'react-modern-calendar-datepicker';
import Task from '../components/Task';
import { v4 as uuidv4 } from 'uuid';
import { BsPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';

//TODO: add delete button for each task

const TaskList = ({ tasks, setTasks }) => {
  const [addMode, setAddMode] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [daysToComplete, setDaysToComplete] = useState(3);

  const tasksList = tasks.map(task => {
    return <Task key={task.id} id={task.id} name={task.name} dueDate={task.dueDate} setTasks={setTasks} />
  });

  const renderCustomInput = ({ ref }) => (
    <div ref={ref}>
      <Button>Add Due Date</Button>
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
        date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day, 0, 0, 0, 0);
      }
      return [...prevtasks, { id: uuidv4(), name: taskName, dueDate: date }]
    });
    setTaskName('');
    setSelectedDate(null);
  };

  const handleChangeDays = (e, data) => {
    setDaysToComplete(data.value);
  };

  return (
    <>
      <Header style={{ fontSize: '2em' }} textAlign='center'>Tasks</Header>
      <Card.Group style={{ margin: '2em' }}>
        {tasksList}
        {addMode ?
          <Card>
            <Card.Content style={{ textAlign: 'center' }}>
              <Input fluid placeholder='Type task name...' value={taskName} onChange={handleAddName} onKeyDown={handleKeyPress} style={{ marginBottom: '.5em' }}></Input>
              {selectedDate && 
                <div style={{ marginBottom: '.5em' }}>Due Date: {selectedDate.month}/{selectedDate.day}</div>
              }
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                renderInput={renderCustomInput}
                inputPlaceholder='Select due date'
                minimumDate={utils().getToday()}
                colorPrimary="#f589a2"
              />
              <Button onClick={handleAddTask}>Add Task</Button>
            </Card.Content>
          </Card> :
          <Card onClick={setAddMode(true)}>
            <Card.Content style={{ justifyContent: 'center', textAlign: 'center' }}>
              <BsPlus style={{ width: '3em', height: 'auto', margin: '3em' }} />
            </Card.Content>
          </Card>
        }
      </Card.Group>
      <div style={{ float: 'right' }}>
        <span style={{ fontSize: '1.2em' }}>I have <Input type='number' size='small' value={daysToComplete} onChange={handleChangeDays} style={{ width: '4.5em' }}/> days to complete these tasks.</span>
        <Link to='/plan'>
          <Button floated='right' style={{ marginLeft: '1em' }}>
            Generate Plan
          </Button>
        </Link>
      </div>
    </>
  )
};

export default TaskList;