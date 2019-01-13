import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Stockage  from '../../helpers/Stockage';

import popin from '../../styles/popin.css';
import index from '../../styles/index.css';

const Succes = ({score}) => (
  <section className="success">
    <h1 className="logo">LAME</h1>
    <section className="container">
      <span className="backText">GOOD JOB</span>
      <span className="frontText">Obstinact is the key to success.</span>
      <Link className='buttonReplay' to={'/'}>REPLAY</Link>
    </section>
  </section>
);

export default Succes;
