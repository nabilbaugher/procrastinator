import React from 'react';
import { Divider, Header, Segment } from 'semantic-ui-react';
import './Day.scss';
import { v4 as uuidv4 } from 'uuid';

const Day = ({ dayNumber, dayTasks }) => {
  const listOfTasks = dayTasks.map((task, idx) => {
    const dueDateText = <span className='day__due-date'>{task.dueDate ? task.dueDate.getMonth() + '/' + task.dueDate.getDate() : null}</span>;
    if (idx === 0) {
      return <li key={uuidv4()}className='day__first-task'>{task.name}{dueDateText}</li>
    }
    return <li key={uuidv4()} className='day__task'>{task.name}{dueDateText}</li>
  });

  return (
    <Segment>
      <Header as='h2' className='center'>Day {dayNumber}</Header>
      <Divider />
      <ol>
        { dayTasks.length === 0 ? <li key={uuidv4()} className='day task'>WooHoo! Nothing to do today!</li> : listOfTasks }
      </ol>
    </Segment>
  )
};

export default Day;