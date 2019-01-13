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

    //FOR EACH CATEGORY
    //Update score category
    // updateScoreCategory(id, scoreCategory){
    //     this.game[id].score = scoreCategory
    //     this.updateLocalStorage()
    // }
    // //Get score category
    // getScoreCategory(id) {
    //     return this.game[id].score
    // }
    // //Update life category
    // updateLifeCategory(id, errorCategory){
    //     this.game[id].life = errorCategory
    //     this.updateLocalStorage()
    // }
    // //Get life category
    // getLifeCategory(id) {
    //     return this.game[id].life
    // }

    //GLOBAL
    updateLife(id, life){
        this.game[id].life = life
        this.updateLocalStorage()
    }

    // getLifeGlobal(life) {
    //     return this.game[i].life
    // }

    updateScore(id, score){
        this.game[id].score = score
        this.updateLocalStorage()
    }

    updateGlobalScore(score) {
      this.game.globalScore = score
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

    getGlobalScore() {
      let globalScore = 0
      for(let category in this.game) {
        if(category.score) globalScore += category.score
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

    //Reset au bout de 3 erreurs
    resetLocalStorage() {
        localStorage.setItem('game', '{}')
    }

}

export default new Stockage()
