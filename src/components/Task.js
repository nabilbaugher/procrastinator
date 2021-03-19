import React from 'react';
import { VscClose } from 'react-icons/vsc';
// import './Task.scss';

const Task = ({ id, name, dueDate, hoursToComplete, setTasks }) => {
  const deleteTask = () => {
    setTasks(prevtasks => prevtasks.filter(task => task.id !== id));
  };

  return (
    <>
      <ul className='relative p-5 bg-gray-50 bg-opacity-30 hover:bg-opacity-20 rounded-lg break-words shadow-lg'>
        <div onClick={deleteTask} className='p-1 m-2 absolute top-0 right-0 cursor-pointer'>
          <VscClose style={{ transform: 'scale(1.2)' }}/>
        </div>
        <div className='text-2xl font-semibold'>{name}</div>
        <div>
          {dueDate ? 
            <div>Due date: {dueDate.getMonth()}/{dueDate.getDate()}</div> :
            <div>No due date</div>
          }
          {hoursToComplete ? 
            <div>~{hoursToComplete} hours</div> :
            <div>No timeframe</div>
          }
        </div>
        
      </ul>
    </>
  )

  // return (
  //   <Card className='task'>
  //     <Card.Content className='secondary'>
  //       <div onClick={deleteTask} className='task__delete-btn'>
  //         <VscClose style={{ transform: 'scale(1.2)' }}/>
  //       </div>
  //       <Card.Header>{name}</Card.Header>
  //       <Card.Description>
  //         {dueDate ? 
  //           <div>Due date: {dueDate.getMonth()}/{dueDate.getDate()}</div> :
  //           <div>No due date</div>
  //         }
  //         {hoursToComplete ? 
  //           <div>~{hoursToComplete} hours</div> :
  //           <div>No timeframe</div>
  //         }
  //       </Card.Description>
        
  //     </Card.Content>
  //   </Card>
  // )
};

export default Task;