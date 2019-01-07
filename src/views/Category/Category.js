import React from 'react';
import PropTypes from 'prop-types';
import Stockage  from '../../helpers/Stockage';

const Category = ({ categoryName, questions, checkAnswer, inputRef, life, score}) => (
  <section>
    <h1>{categoryName}</h1>
    <section>
      {questions}
      <form onSubmit={e => checkAnswer(e)}>
        <input name="reponse" ref={inputRef} autoFocus/>
        <input type="submit" value="Valider"/>
      </form>

      <span>error in this category: </span> <br/>
      <span>score in this category: </span> <br/>

      <span>life: {life}</span> <br/>
      <span>score: {score}</span>
    </section>
  </section>
);

Category.propTypes = {
  categoryName: PropTypes.string,
};

export default Category;
