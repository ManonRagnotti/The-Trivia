import React from 'react';
import PropTypes from 'prop-types';

const Category = ({ categoryName, questions }) => (
  <section>
    <h1>{categoryName}</h1>
    <section>
        <span>{questions}</span>
    </section>
  </section>
);

Category.propTypes = {
  categoryName: PropTypes.string,
};

export default Category;
