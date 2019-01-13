import React, { Component } from 'react';
import Home from './Home';

class HomeContainer extends Component {
  state = {
    categories: [],
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

//home animation function
  explode = (e) => {
    e.preventDefault()
    console.log('cliked')
    document.querySelector('.home_list_container').style.display ='block';
    document.querySelector('.home_button').style.display ='none';
  }

  render() {
    return (
      <Home
        categories={this.state.categories}
        explode={this.explode}
      />
    );
  }
}

export default HomeContainer;
