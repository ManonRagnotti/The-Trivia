class Stockage {

  //Stockage des données dans game
  constructor() {
    this.resetLocalStorage()
    this.game = JSON.parse(localStorage.getItem('game'))
    console.log('mounted')
  }

  //Ajouter 1 à chaque mauvaise reponse
  updateWrongAnswer(id) {
      this.game[id] = this.game[id] + 1 || 1
      if(this.game[id] >= 3) return true
  }

  //Reset au bout de 3 erreurs
  resetLocalStorage() {
    localStorage.setItem('game', '{}')
  }

}

export default new Stockage()
