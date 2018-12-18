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
      errorCategory: null,
      life: 3,
      score: 0,
      looser : false
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
    } );
  }

  componentDidUpdate() {
    if(this.state.category) {
      Stockage.init( this.state.category.id, this.state.score, this.state.life )
      if(Stockage.isInLocalStorage()) {
        console.log("deja la")
        this.setState( prevState => {
          return (
            {score: Stockage.getScoreCategory( this.state.category.id ),
              life: Stockage.getLifeCategory( this.state.category.id )}
            )
          } )
      }
    }
  }


  //Go to the next question
  nextQuestion = (e) => {
    //Créer un array pour stocker les questions
    const questions = Array(...this.state.category.questions)
    console.log(questions);
    questions.shift(); //Delete the first line of array and past to the next question

    //Update state
    this.setState(prevState => ({
      category: {
        id: prevState.category.id, //Keep the starting State
        name: prevState.category.name,
        questions: questions //Update array of questions
      }
    }))
  }

  //Check the Answer
  checkAnswer = (e) => {
    e.preventDefault()
    //Compare our value to the right answer and past to the next question if our value is true
    //Supprime le contenu de la case pour laisser un champs vide
    //Ajouter 1 au score si c'est juste
    if(this.inputRef.current.value == this.state.category.questions[0].answer) {
      this.nextQuestion()
      this.inputRef.current.value = '';
      this.setState( prev =>({
        score: prev.score + 1
      }), () => { Stockage.updateScoreCategory( this.state.category.id, this.state.score  ) })
    }

    //Update la vie, décrémente de 1 à chaque faute, passe à la question d'après et vide le champs
    else {
      alert('Mauvaise réponse')
      this.nextQuestion()
      this.inputRef.current.value = '';
      this.setState(prev=>({
        life: prev.life - 1
      }), () => { Stockage.updateLifeCategory( this.state.category.id, this.state.life  ) })


      // If wrong answer add 1 to resetLocalStorage and reset if 3 errors
      if(Stockage.updateWrongAnswer(this.state.category.id)) {
        alert(`T'es un looser`)
        Stockage.resetLocalStorage()
        this.setState({looser: true})
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
    if(this.state.category.questions[0] == undefined || this.looser) {
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
      life={this.state.life}
      score={this.state.score}
      />
    );
  }
}

export default CategoryContainer;
