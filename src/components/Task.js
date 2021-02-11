import React from 'react';
import { Card } from 'semantic-ui-react';
import { VscClose } from 'react-icons/vsc';

const Task = ({ id, name, dueDate, setTasks }) => {
  const deleteTask = () => {
    setTasks(prevtasks => {
      for (let i = 0; i < prevtasks.length; i++) {
        if (prevtasks[i].id === id) {
          return prevtasks.splice(i, 1);
        } 
      }
      return prevtasks;
    });
  };

  return (
    <Card style={{ wordWrap: 'break-word' }}>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>
          {dueDate ? 
            <div>Due date: {dueDate.getMonth()}/{dueDate.getDay()}</div> :
            <span>No due date</span>
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