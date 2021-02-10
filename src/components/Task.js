import React from 'react';
import { Card, Header } from 'semantic-ui-react';

const Task = ({ name, dueDate }) => {
  return (
    <Card style={{ wordWrap: 'break-word' }}>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>
          {dueDate ? 
            <div>Due date: {dueDate}</div> :
            <span>No due date</span>
          }
          
        </Card.Description>
      </Card.Content>
      
    </Card>
  )
};

export default Task;