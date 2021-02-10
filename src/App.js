import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Divider } from 'semantic-ui-react';
import './App.css';
import TaskList from './pages/TaskList.js';
import Plan from './pages/Plan';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <div className="App">
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/plan">
            <Plan tasks={tasks} />
          </Route>
          <Route path="/">
            <TaskList tasks={tasks} setTasks={setTasks}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
