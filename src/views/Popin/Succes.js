import React from 'react';
import PropTypes from 'prop-types';
import Stockage  from '../../helpers/Stockage';

import index from '../../styles/index.css';

const Succes = ({score}) => (
  <section className="success">
    <h1 className="logo">LAME</h1>
    <section className="container">
      <span className="backText">GOOD JOB</span>
      <span className="frontText">Obstinact is the key to success.</span>
      <form onSubmit={e => Stockage.gameOver(e)} Redirect to="/">
        <input type="submit" value="REPLAY"/>
      </form>
    </section>
  </section>
);

export default Succes;
