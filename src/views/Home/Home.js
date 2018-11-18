import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Home.css';

const Home = ({ categories }) => (
  <section>
    <h1>Homepage</h1>
    {categories.length > 0 && (
        <section>
            <ul>
            {categories.map(category => (
                <li key={category.id}>
                    <Link to={`/categories/${category.id}`} key={category.id} >
                      {category.title}
                    </Link>
                </li>
            ))}
            </ul>
        </section>
    )}
  </section>
);

Home.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      clues_count: PropTypes.number
    }),
  ),
}

export default Home;
