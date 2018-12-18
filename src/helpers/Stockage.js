class Stockage {

  //Stockage des données dans game
  constructor() {
    this.resetLocalStorage()
    this.game = JSON.parse(localStorage.getItem('game'))
    // this.localStorageGame = ''
    console.log('mounted')
  }

  //Initialisation de la categorie dans le localstorage
  init( id, score, life) {
    if ( !this.isInLocalStorage() ) {
      this.game[id] =  {
        score: score,
        life: life
      }
      this.updateLocalStorage()
    }
  }

  updateLocalStorage() {
    localStorage.setItem( 'game', JSON.stringify(this.game) )
  }

  isInLocalStorage( id ) {
    if ( id in this.game ) {
      return true
    }
    return false
  }

  //Score wrong answer
  updateWrongAnswer(id) {
      // this.game[id] = this.game[id] + 1 || 1
      // this.localStorageGame = JSON.stringify(this.game)
      // localStorage.setItem('game', this.localStorageGame)
      //
      // //score transforme en json les données récupéré dans le localStorage et dans game
      // var score = JSON.parse(localStorage.getItem('game'))
      // //counter est à 0, il compte les fautes
      // var error = 0
      // //a chaque erreur le compteur est incrémenté de 1
      // for (var i in score){
      //   error = error + score[i]
      // }
      // //Au bout de 3 erreur le score est remis à 0
      // if(error >= 3) return true
      //
      // console.log(score, error);
  }

  //Update score category
  updateScoreCategory(id, score){
    this.game[id].score = score
    this.updateLocalStorage()
  }

  getScoreCategory(id) {
    return this.game[id].score
  }

  //Update life category
  updateLifeCategory(id, life){
    this.game[id].life = life
    this.updateLocalStorage()
  }

  getLifeCategory(id) {
    return this.game[id].life
  }

  getGlobalScore() {

  }



  //Reset au bout de 3 erreurs
  resetLocalStorage() {
    localStorage.setItem('game', '{}')
  }

}

export default new Stockage()
