import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../styles/img/logo.png';
import shapeHome from '../../styles/img/morceau-home.png';

import './Home.css';

const Home = ({ categories, images }) => (
  <section>
    <div className="content">

      <div className="homepage">
      <div className="logo-content">
      <img className="logo" src={Logo} alt="LAME"/>
      </div>
    <div className="figure">
      <span className="home-text">CLICK HERE</span>
      <img className="shape-home" src={shapeHome} alt="HOME"/>
    </div>
      </div>

    { categories.length && images.length > 0 && (
        <section>
        <h1 className="choose-title">CHOOSE YOUR CATEGORY</h1>
            <ul className="categories-list">
            {categories.map(category => (
              <li className="categories-item" key={category.id}>
                    <Link to={`/categories/${category.id}`} key={category.id} >
                  <span className="category-title"> {category.title}</span>
                    </Link>

                <img className="shape-category" src={images[1]} alt="img" />

                </li>
            ))}
            </ul>
        </section>
    )}
    </div>
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
