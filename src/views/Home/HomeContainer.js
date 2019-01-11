import React, { Component } from 'react';
import Home from './Home';
import shape1 from '../../styles/img/morceau-1.png';
import shape2 from '../../styles/img/morceau-2.png';
import shape3 from '../../styles/img/morceau-3.png';
import shape4 from '../../styles/img/morceau-4.png';
import shape5 from '../../styles/img/morceau-5.png';
import shape6 from '../../styles/img/morceau-6.png';
import shape7 from '../../styles/img/morceau-7.png';
import shape8 from '../../styles/img/morceau-8.png';

class HomeContainer extends Component {
  state = {
    categories: [],

      images: [
          shape1,
          shape2,
          shape3,
          shape4,
          shape5,
          shape6,
          shape7,
          shape8,
          shape1,
          shape2
      ],


  }


  componentDidMount() {
    fetch('http://jservice.io/api/categories?count=10').then(response => {
      response.json().then(categories => {
        this.setState({
          categories: categories,
        })
        console.log(categories);
      });
    })
  }
  render() {
    return (
      <Home categories={this.state.categories} images={this.state.images}/>
    );
  }
}

export default HomeContainer;
