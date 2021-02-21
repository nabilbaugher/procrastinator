import React from 'react';
import {Container, Header, Segment} from 'semantic-ui-react';

const Day = ({ dayNumber, dayTasks }) => {
  const listOfTasks = dayTasks.map(task => {
    return <div>{task.name}</div>
  });

  return (
    <Segment>
      <Header className='centered'>Day {dayNumber}</Header>
      {listOfTasks}
    </Segment>
  )
};

export default Day;