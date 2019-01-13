import React from 'react';
import PropTypes from 'prop-types';
import Stockage  from '../../helpers/Stockage';
import category from '../../styles/category.css';


const Category = ({ categoryName, questions, checkAnswer, inputRef, life, score}) => (
  <section>
    <h1>{categoryName}</h1>
    <section className="category_container">

      <div className="life_score_container">
        <span className="life">{life}</span>
        <span className="score">{score} / 10</span>
      </div>

      <p>{questions}</p>

      <form onSubmit={e => checkAnswer(e)}>
        <input className="category_input_answer" name="reponse" ref={inputRef} autoFocus/>
        <input className="category_input_submit" type="submit" value=""/>
      </form>



    </section>
  </section>
);

Category.propTypes = {
  categoryName: PropTypes.string,
};

export default Category;
