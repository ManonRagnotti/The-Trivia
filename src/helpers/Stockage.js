class Stockage {

  //Stockage des données dans game
  constructor() {
    this.resetLocalStorage()
    this.game = JSON.parse(localStorage.getItem('game'))
    this.localStorageGame = ''
    console.log('mounted')
  }

  //Score wrong answer
  updateWrongAnswer(id) {
      this.game[id] = this.game[id] + 1 || 1
      this.localStorageGame = JSON.stringify(this.game)
      localStorage.setItem('game', this.localStorageGame)

      //score transforme en json les données récupéré dans le localStorage et dans game
      var score = JSON.parse(localStorage.getItem('game'))
      //counter est à 0, il compte les fautes
      var counter = 0
      //a chaque erreur le compteur est incrémenté de 1
      for (var i in score){
        counter = counter + score[i]
      }
      //Au bout de 3 erreur le score est remis à 0
      if(counter >= 3) return true

  }

  //Reset au bout de 3 erreurs
  resetLocalStorage() {
    localStorage.setItem('game', '{}')
  }

}

export default new Stockage()
