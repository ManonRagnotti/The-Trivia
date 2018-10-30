import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ question }) => (
  <section>
    <h1>Question: {question}</h1>
  </section>
);

Question.propTypes = {
  question: PropTypes.string.isRequired,
};

export default Question;
