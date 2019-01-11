import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../styles/img/logo.png';
import shapeHome from '../../styles/img/morceau-home.png';
import shape1 from '../../styles/img/morceau-1.png';
import shape2 from '../../styles/img/morceau-2.png';
import shape3 from '../../styles/img/morceau-3.png';
import shape4 from '../../styles/img/morceau-4.png';
import shape5 from '../../styles/img/morceau-5.png';
import shape6 from '../../styles/img/morceau-6.png';
import shape7 from '../../styles/img/morceau-7.png';
import shape8 from '../../styles/img/morceau-8.png';

import './Home.css';

const Home = ({ categories }) => (
  <section>
    <div className="content">
      <div className="homepage">
      <div className="logo-content">
      <img className="logo" src={Logo} alt="LAME"/>
      </div>
    <div className="figure">
      <span className="home-text">PRESS & HOLD</span>
      <img className="shape-home" src={shapeHome} alt="HOME"/>
    </div>
      </div>

    
    {categories.length > 0 && (
        <section>
        <h1 className="choose-title">CHOOSE YOUR CATEGORY</h1>
            <ul className="categories-list">
            {categories.map(category => (
              <li className="categories-item" key={category.id}>
                    <Link to={`/categories/${category.id}`} key={category.id} >
                  <span className="category-title"> {category.title}</span>
                    </Link>
                <img className="shape-category" src={shape1} alt="" />
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
