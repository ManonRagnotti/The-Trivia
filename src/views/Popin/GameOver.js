import React from 'react';
import PropTypes from 'prop-types';
import Stockage  from '../../helpers/Stockage';

const GameOver = ({life}) => (
  <section>
    <h1 className="logo">LAME</h1>
    <section>
      <span className="backText">TRY AGAIN</span>
      <span className="frontText">To win, you need to loose.</span>
      <span className="replay">REPLAY</span>
    </section>
  </section>
);

export default GameOVer;
