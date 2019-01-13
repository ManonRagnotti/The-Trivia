import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import home from '../../styles/home.css';

// import './Home.css';

const Home = ({ categories, explode }) => (
  <section>
    <h1 className="logo">LAME</h1>
    {categories.length > 0 && (
        <section>
            <button className="home_container" onClick={e => explode(e)}></button>
            <ul className="home_list_container">
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
