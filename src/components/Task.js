import React from 'react';
import { Card } from 'semantic-ui-react';
import { VscClose } from 'react-icons/vsc';
import './Task.scss';

const Task = ({ id, name, dueDate, hoursToComplete, setTasks }) => {
  const deleteTask = () => {
    setTasks(prevtasks => prevtasks.filter(task => task.id !== id));
  };

  return (
    <Card className='task'>
      <Card.Content className='secondary'>
        <div onClick={deleteTask} className='task__delete-btn'>
          <VscClose style={{ transform: 'scale(1.2)' }}/>
        </div>
        <Card.Header>{name}</Card.Header>
        <Card.Description>
          {dueDate ? 
            <div>Due date: {dueDate.getMonth()}/{dueDate.getDate()}</div> :
            <div>No due date</div>
          }
          {hoursToComplete ? 
            <div>~{hoursToComplete} hours</div> :
            <div>No timeframe</div>
          }
        </Card.Description>
        
      </Card.Content>
    </Card>
  )
};

export default Task;