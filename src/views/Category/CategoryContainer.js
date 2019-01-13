import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';

import api from '../../helpers/api';
import Stockage  from '../../helpers/Stockage';

import Category from './Category';
import GameOver from '../Popin/GameOver';
import Succes from '../Popin/Succes';


class CategoryContainer extends Component {

  constructor(props){
    super(props)
    this.inputRef = React.createRef()
    this.state = {
      category: null,
      life: 3,
      score: 0,
      gameOver: false,
      winner: false
    }
  }

  async componentDidMount() {
    const data = await api.getCategoryById(this.props.match.params.id)
    console.log('data' , data);
    const globalScore = Stockage.getGlobalScore()
    const globalLife = Stockage.getGlobalLife()
    console.log(globalScore)
    
    //State de depart
    this.setState({
      category: {
        id: data.id,
        name: data.title,
        questions: data.clues
      },
      globalScore
    } );

    if(this.state.category) {
      Stockage.init( this.state.category.id, this.state.score, this.state.life )
      if(Stockage.isInLocalStorage(this.state.category.id)) {
        console.log("deja la")
        this.setState( prevState => {
          return (
            {
              score: Stockage.getCategoryScoreById( this.state.category.id ),
              life: Stockage.getCategoryLifeById( this.state.category.id )
            }
          )
        })
      }
    }

  }

  //Si on arrive sur une category: stocker l'id , le score et la vie dans local storage
  componentDidUpdate() {


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
    }), () => {
      Stockage.isInLocalStorage( this.state.category.questions)
    })
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
        score: prev.score + 1,
        globalScore: prev.globalScore + 1
      }), () => {
        Stockage.updateScore( this.state.category.id, this.state.score)
        Stockage.updateGlobalScore(this.state.globalScore)
       })
       if( this.state.globalScore === 10 ) {
 				this.setState({ winner: true })
 			}
    }

    //Update la vie, décrémente de 1 à chaque faute, passe à la question d'après et vide le champs
    else {
      alert('Mauvaise réponse')
      this.nextQuestion()
      this.inputRef.current.value = '';
      this.setState(prev=>({
        life: prev.life - 1
      }), () => {
        Stockage.updateLife( this.state.category.id, this.state.life)
      })
      if( this.state.life === 1 ) {
				this.setState({ gameOver: true })
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

    //Redirect to GameOver page if you are a gameOver
    if( this.state.gameOver) {
      return (
        <Redirect to="/gameover" />
      )
    }

    //Redirect to Succes page if you are a winner
    if( this.state.winner) {
      return (
        <Redirect to="/succes" />
      )
    }

    //Redirect to home if there is not more question
    if(this.state.category.questions[0] == undefined ) {
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
      globalScore={this.state.globalScore}
      />
    );
  }
}

export default CategoryContainer;
