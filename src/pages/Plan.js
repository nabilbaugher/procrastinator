import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import './Plan.scss';
import Day from '../components/Day';
import { v4 as uuidv4 } from 'uuid';

const Plan = ({ tasks, daysToComplete }) => {
  const dividedTasks = [];
  for (let day = 0; day < daysToComplete; day++) {
    dividedTasks.push([]);
  }
  for (let i = 0; i < tasks.length; i++) {
    dividedTasks[i % daysToComplete].push(tasks[i]);
  }
  const daysList = dividedTasks.map(dayTasks => {
    return (
      <Grid.Column width={4} key={uuidv4()}>
        <Day dayTasks={dayTasks}/>
      </Grid.Column>
    );
  });

  return (
    <div className='center'>
      <Header className='page-header'>Plan</Header>
      <Grid className='centered'>
        {daysList}
      </Grid>
    </div>
  )
}

export default Plan;