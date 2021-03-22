import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import TodoState from './context/todo/TodoState';

function App() {
  return (
    <TodoState>
      <Router>
        <Fragment>
          <NavBar />
          <div className="app">
            <div className="container">
              <h1 className="text-center mb-4">Todoodily</h1>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
              </Switch>
            </div> </div> 
            </Fragment>
      </Router>
    </TodoState>
  );
}

export default App;
