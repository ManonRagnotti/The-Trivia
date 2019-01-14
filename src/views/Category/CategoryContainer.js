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

    //State de depart
    this.setState({
      category: {
        id: data.id,
        name: data.title,
        questions: data.clues
      }
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
  componentDidUpdate() {  }


  //Passer à la prochiane question
  nextQuestion = (e) => {
    //Créer un array pour stocker les questions
    const questions = Array(...this.state.category.questions)
    console.log(questions);
    questions.shift(); //Suppression de la première question et passage a la suivante

    //Update state
    this.setState(prevState => ({
      category: {
        id: prevState.category.id, //Preserve le state de depart
        name: prevState.category.name,
        questions: questions //Update les questions
      }
    }), () => {
      Stockage.isInLocalStorage( this.state.category.questions.clues )
    })
  }

  //Verification de la reponse
  checkAnswer = (e) => {
    e.preventDefault()
    //Compare notre reponse à la bonne réponse et passe à la question suivante
    //Supprime le contenu de la case pour laisser un champs vide
    //Ajouter 1 au score si c'est juste
    if(this.inputRef.current.value == this.state.category.questions[0].answer) {
      this.nextQuestion()
      this.inputRef.current.value = '';
      this.setState( prev =>({
        score: prev.score + 1
      }), () => {
        Stockage.updateScore( this.state.category.id, this.state.score)
       })
       //Si 10 bonne réponse, accès à la page Success et resetLocalStorage
       if( this.state.score === 10 ) {
        Stockage.resetLocalStorage()
 				this.setState({ winner: true })
 			}
    }

    //Si réponse fausse
    //Update  la vie, décrémente de 1 à chaque faute, passe à la question d'après, vide le champs
    else {
      this.nextQuestion()
      this.inputRef.current.value = '';
      this.setState( prev =>({
        life: prev.life - 1
      }), () => {
        Stockage.updateLife( this.state.category.id, this.state.life)
      })
      //Si 3 erreurs, vie à 0, accès à la page GameOver et resetLocalStorage
      if( this.state.life === 1 ) {
        Stockage.resetLocalStorage()
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

    //Redirect to GameOver page if you are gameOver
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
      />
    );
  }
}

export default CategoryContainer;
