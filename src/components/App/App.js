import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import styled from 'styled-components';
import './App.css';

import HomeContainer from '../../views/Home/HomeContainer';
import CategoryContainer from '../../views/Category/CategoryContainer';
import GameOver from '../../views/Popin/GameOver';
import Succes from '../../views/Popin/Succes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <Route exact path="/" component={HomeContainer} />
            <Route path="/categories/:id" component={CategoryContainer} />
            <Route path="/gameover" component={GameOver} />
            <Route path="/succes" component={Succes} />
           </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
