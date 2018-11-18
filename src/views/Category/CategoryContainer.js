import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'

import api from '../../helpers/api';
import Stockage  from '../../helpers/Stockage';

import Category from './Category';

class CategoryContainer extends Component {

  constructor(props){
    super(props)
    this.inputRef = React.createRef()
    this.state = {
      category: null,
    }
  }

  async componentDidMount() {
    const data = await api.getCategoryById(this.props.match.params.id)
    console.log('data' , data);

    //State de depart
    this.setState({
      category: {
        id: data.id,
        name: data.title,
        questions: data.clues
      }
    });
  }

  //Go to the next question
  nextQuestion = (e) => {
    //Create an array for stock questions
    const questions = Array(...this.state.category.questions)
    console.log(questions);
    questions.shift(); //Delete the first line of array and past to the next question

    //Update state
    this.setState(prevState => ({
      category: {
        id: prevState.category.id, //Keep the start State
        name: prevState.category.name,
        questions: questions //Update array of questions
      }
    }))
  }

  //Check the Answer
  checkAnswer = (e) => {
    e.preventDefault()
    //Compare our value to the right answer and past to the next question if our value is true
    if(this.inputRef.current.value == this.state.category.questions[0].answer) {
      this.nextQuestion()
      this.inputRef.current.value = ''
    }else {
      alert('Mauvaise réponse')
      this.nextQuestion()
      this.inputRef.current.value = ''

      // If wrong answer add 1 to resetLocalStorage and reset if 3 errors
      if(Stockage.updateWrongAnswer(this.state.category.id)) {
        alert(`T'es un looser`)
        Stockage.resetLocalStorage()
        this.forceUpdate()

      }
    }
  }

  render() {
    if(this.state.category == null){
      return (
        <div>
        Loading...
        </div>
      )
    }

    //Redirect to home if there is not more question
    if(this.state.category.questions[0] == undefined) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <Category
      categoryName={this.state.category.name}
      questions={this.state.category.questions[0].question}
      checkAnswer={this.checkAnswer}
      inputRef={this.inputRef}
      />
    );
  }
}

export default CategoryContainer;
