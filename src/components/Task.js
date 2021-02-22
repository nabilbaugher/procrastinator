import React from 'react';
import { Card } from 'semantic-ui-react';
import { VscClose } from 'react-icons/vsc';

const Task = ({ id, name, dueDate, setTasks }) => {
  const deleteTask = () => {
    setTasks(prevtasks => prevtasks.filter(task => task.id !== id));
  };

  return (
    <Card style={{ wordWrap: 'break-word' }}>
      <Card.Content className='secondary'>
        <Card.Header>{name}</Card.Header>
        <Card.Description>
          {dueDate ? 
            <div>Due date: {dueDate.getMonth()}/{dueDate.getDate()}</div> :
            <div>No due date</div>
          }
        </Card.Description>
        <div onClick={deleteTask} style={{ padding: '2px', margin: '3px', position: 'absolute', top: '0', right: '0' }}>
          <VscClose style={{ transform: 'scale(1.2)' }}/>
        </div>
      </Card.Content>
    </Card>
  )
};

export default Task;