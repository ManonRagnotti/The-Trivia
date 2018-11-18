import React from 'react';
import PropTypes from 'prop-types';

const Category = ({ categoryName, questions, checkAnswer, inputRef}) => (
  <section>
    <h1>{categoryName}</h1>
    <section>
      {questions}
      <form onSubmit={e => checkAnswer(e)}>
        <input name="reponse" ref={inputRef} autoFocus/>
        <input type="submit" value="Valider"/>
      </form>
    </section>
  </section>
);

Category.propTypes = {
  categoryName: PropTypes.string,
};

export default Category;
