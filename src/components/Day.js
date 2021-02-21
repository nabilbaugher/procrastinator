import React from 'react';
import { Divider, Header, Segment } from 'semantic-ui-react';
import './Day.scss';
import { v4 as uuidv4 } from 'uuid';

const Day = ({ dayNumber, dayTasks }) => {
  const listOfTasks = dayTasks.map((task, idx) => {
    const dueDateText = <span className='due-date'>{task.dueDate ? task.dueDate.getMonth() + '/' + task.dueDate.getDate() : null}</span>;
    if (idx == 0) {
      return <li key={uuidv4()}className='first-task'>Do First: {task.name}{dueDateText}</li>
    }
    return <li key={uuidv4()} className='task'>{task.name}{dueDateText}</li>
  });

  return (
    <Segment>
      <Header className='centered'>Day {dayNumber}</Header>
      <Divider />
      <ul>
        {listOfTasks}
      </ul>
    </Segment>
  )
};

export default Day;