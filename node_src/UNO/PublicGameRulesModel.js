let GameRulesModel = require('./GameRulesModel.js');
let UNOClient = require('./UNOClient.js');

/**
 * Layer over GameRulesModel to serve data back to clients.
 * @type {module.PublicGameRulesModel}
 */
module.exports = class PublicGameRulesModel {
    constructor(gameRules) {
        this.discardDeck = gameRules.getDiscardDeck();
        this.drawDeckCount = gameRules.getDrawDeckCount();
        this.winner = false;
        this.ready = true;

        let hasWinner = gameRules.clientRepository.findByHasWon(true);
        let nonReady = gameRules.clientRepository.findByReady(false);

        if(hasWinner){
            this.winner = hasWinner.getName();
        }
        if(nonReady){        
            this.ready = false;
        }
    }
};