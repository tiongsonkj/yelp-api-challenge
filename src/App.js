import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Main from './components/Pages/Main';
import Details from './components/Pages/Details';

// creating our store
import { Provider } from 'react-redux';
import store from './store';


class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Route exact path="/" component={Main}/>
            <Route name="details" path="/details" component={Details}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
