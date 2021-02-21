import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import TaskList from './pages/TaskList.js';
import Plan from './pages/Plan';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [daysToComplete, setDaysToComplete] = useState(3);

  return (
    <div className="App">
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/plan">
            <Plan tasks={tasks} daysToComplete={daysToComplete} />
          </Route>
          <Route path="/">
            <TaskList tasks={tasks} setTasks={setTasks} daysToComplete={daysToComplete} setDaysToComplete={setDaysToComplete} style={{ textAlign: 'center' }}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
