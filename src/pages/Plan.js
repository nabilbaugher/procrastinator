import React, { useState, useEffect } from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import './Plan.scss';
import Day from '../components/Day';
import { v4 as uuidv4 } from 'uuid';
import { Link, Redirect } from 'react-router-dom';
import Watermark from '../components/Watermark';

const Plan = ({ tasks, daysToComplete }) => {
  useEffect(() => {
    if (tasks.length === 0) {
      window.alert('Add tasks before generating a plan.');
    }
  }, []);

  const [sortedTasks, setSortedTasks] = useState([]);
  const [dividedTasks, setDividedTasks] = useState([]);
  const [width, setWidth] = useState(4);

  useEffect(() => {
    setSortedTasks(() => {
      return tasks.slice().sort((a, b) => {
        if (a.dueDate && b.dueDate) {
          return a.dueDate - b.dueDate;
        } if (a.dueDate) {
          return -1;
        } if (b.dueDate) {
          return 1;
        }
        return Math.random() * 2 - 1;
      });
    })

    if (daysToComplete === 3) {
      setWidth(5);
    } if (daysToComplete <= 2) {
      setWidth(8);
    }
  }, []);
  
  useEffect(() => {
    setDividedTasks([]);
    for (let day = 0; day < daysToComplete; day++) {
      setDividedTasks(prevDividedTasks => {
        return [...prevDividedTasks, []]
      });
    }
    
    if (dividedTasks.length > 0) {
      for (let i = 0; i < sortedTasks.length; i++) {
        setDividedTasks(prevDividedTasks => {
          const result = prevDividedTasks.slice();
          result[Math.floor(i/(sortedTasks.length/daysToComplete))].push(sortedTasks[i]);
          return result;
        });
      }
    }
  }, [sortedTasks]);

  const daysList = dividedTasks.map((dayTasks, idx) => {
    return (
      <Grid.Column width={width} key={uuidv4()}>
        <Day dayTasks={dayTasks} dayNumber={idx + 1}/>
      </Grid.Column>
    );
  });

  return (
    <div className='center'>
      <Header className='page-header' style={{ marginBottom: '1em' }}>Plan</Header>
      <Grid className='centered content'>
        {daysList}
      </Grid>
      <Link to='/#'>
        <Button className='btn' floated='right'>Back to Tasks</Button>
      </Link>
      <Watermark content='inator.' size={60} />
    </div>
  )
}

export default Plan;