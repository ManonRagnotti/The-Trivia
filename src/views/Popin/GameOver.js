import React from 'react';
import { Route, Redirect } from 'react-router'
import PropTypes from 'prop-types';
import Stockage  from '../../helpers/Stockage';

const GameOver = ({life}) => (
  <section>
    <h1 className="logo">LAME</h1>
    <section>
      <span className="backText">TRY AGAIN</span>
      <span className="frontText">To win, you need to loose.</span>
      <form onSubmit={e => Stockage.gameOver(e)} Redirect to="/">
        <input type="submit" value="REPLAY"/>
      </form>
    </section>
  </section>
);

export default GameOver;
