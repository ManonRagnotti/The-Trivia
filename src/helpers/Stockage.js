class Stockage {

    //Stockage des données dans game
    constructor() {
        this.resetLocalStorage()
        this.game = JSON.parse(localStorage.getItem('game'))
        // this.localStorageGame = ''
        console.log('mounted')
    }

    //Initialisation de la categorie dans le localstorage
    init( id, score, life, questions) {
        if ( !this.isInLocalStorage(id) ) {
            this.game[id] =  {
                score: score,
                life: life,
                questions: questions
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

    //Pour chaque categories
    updateLife(id, life){
        this.game[id].life = life
        this.updateLocalStorage()
    }
    updateScore(id, score){
        this.game[id].score = score
        this.updateLocalStorage()
    }
    getCategoryScoreById( id ) {
        if(this.game[id].score) {
          return this.game[id].score
        }
        return 0
    }
    getCategoryLifeById( id ) {
        if(this.game[id].life) {
          return this.game[id].life
        }
        return 3
    }

    //Global
    updateGlobalScore(score) {
      this.game.globalScore = score
      this.updateLocalStorage()
    }
    updateGlobalLife(life) {
      this.game.globalLife = life
      this.updateLocalStorage()
    }
    getGlobalScore() {
      let globalScore = 0
      for(let category in this.game) {
        if(category.score) globalScore.reduce()
      }
      return globalScore
    }
    getGlobalLife(){
      let globalLife = 3
      for(let category in this.game) {
        if(category.life) globalLife += category.life
      }
      return globalLife
    }

    //Reset le localStorage
    resetLocalStorage() {
        localStorage.setItem('game', '{}')
    }

}

export default new Stockage()
