import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stockage  from '../../helpers/Stockage';

import category from '../../styles/category.css';

const Category = ({ categoryName, questions, checkAnswer, inputRef, life, score) => (
  <section>
    <h1 className="logo">LAME</h1>
    <Link className='backHome' to={'/'}></Link>
    <Link onClick={e => Stockage.resetLocalStorage(e)} className='buttonReplay' to={'/'}>REPLAY</Link>

    <h1 className="categoryName">{categoryName}</h1>

    <section className="category_container">

      <div className="life_score_container">
        <span className="life">{life}</span>
        <span className="score">{score} / 10</span>
      </div>

      <p>{questions}</p>

      <form onSubmit={e => checkAnswer(e)}>
        <input className="category_input_answer" name="answer" ref={inputRef} autoFocus/>
        <input className="category_input_submit" type="submit" value="Valider"/>
      </form>

    </section>
  </section>
);

Category.propTypes = {
  categoryName: PropTypes.string,
};

export default Category;
