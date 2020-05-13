let ClientRepository = require('./UNOClientRepository.js');
let UNOClient = require('./UNOClient.js');

/**
 * UNO Game rules model. This is basis for all game logic
 * @type {module.GameRulesModel}
 */
module.exports = class GameRulesModel{

    constructor(clientRepository) {

        this.cards = [
            'r0','r1','r2','r3','r4','r5','r6','r7','r8','r9','rp','rn','rr',
            'g0','g1','g2','g3','g4','g5','g6','g7','g8','g9','gp','gn','gr',
            'b0','b1','b2','b3','b4','b5','b6','b7','b8','b9','bp','bn','br',
            'y0','y1','y2','y3','y4','y5','y6','y7','y8','y9','yp','yn','yr',
            'kg','kc','kg','kc'
        ];
        this.clientRepository = clientRepository;
        this.drawDeck = [];
        this.discardDeck = [];
        this.direction = true;
    }

    init(){
        this.shuffleDeck();
        this.deal();
        this.begin();
    }

    shuffleDeck() {
        let j, x, i;
        for (i = this.cards.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = x;
        }
        this.drawDeck = [];
        for(i=0; i<this.cards.length; i++){
            this.drawDeck.push(this.cards[i]);
        }
    }
    reShuffleDeck(){
        let current = this.discardDeck.pop();
        let cards = this.discardDeck;

        cards.forEach(function(item, i) { 
            if (item == 'rg' || item == 'yg' || item == 'bg' || item == 'gg') cards[i] = 'kg'; 
            if (item == 'rc' || item == 'yc' || item == 'bc' || item == 'gc') cards[i] = 'kc';             
        });

        let j, x, i;
        for (i = cards.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = cards[i];
            cards[i] = cards[j];
            cards[j] = x;
        }
        this.drawDeck = cards;
        this.discardDeck = [current];
    }
    deal(){
        let i, k;
        let clients = this.clientRepository.findAll();
        for (k=0; k<clients.length; k++){
            clients[k].clearCards();
        }       
        for(i=0; i<7; i++){
            for (k=0; k<clients.length; k++){
                clients[k].addCard(this.drawDeck.shift());
            }
        }
        this.discardDeck = [];
        while(true) {
            let c = this.drawDeck.shift();
            this.discardDeck.push(c);
            if(c !== 'kg' && c !== 'kc') {
                break;
            }
        }
        this.begin();
    }

    /**
     * Begin playing by setting one of client.turn = true
     */
    begin(){
        //Set all client turns to false
        UNOClient.setArrayTurn(this.clientRepository.findAll(), false);
        UNOClient.setArrayHasWon(this.clientRepository.findAll(), false);
        
        //Should be randomized
        this.clientRepository.get(0).setTurn(true);
    }

    /**
     * End playing by setting all clients .turn = false
     */
    end(){

    }
    getNextClient(unoClient){
        let unoClientNext;
        if(this.direction){
            unoClientNext = this.clientRepository.findNext(unoClient);
        }else{
            unoClientNext = this.clientRepository.findPrevious(unoClient);
        }
        if(unoClientNext instanceof UNOClient){
            return unoClientNext;
        }            
        return false;
    }
    finishTurn(unoClient, card){
        
        unoClient.setTakeOrLeave(false);  

        if(typeof card !== 'undefined'){
            let a1 = card.charAt(0);
            let a2 = card.charAt(1);
            let unoClientNext = this.getNextClient(unoClient);
            if(unoClientNext instanceof UNOClient){
                if(a2 === 'g'){     //pick up 4
                    this.takeCard(unoClientNext);
                    this.takeCard(unoClientNext);
                }
                if(a2 === 'p' || a2 === 'g'){     //pick up 2
                    this.takeCard(unoClientNext);
                    this.takeCard(unoClientNext);
                }            
                if(a2 === 'n' || a2 === 'p' || a2 === 'g'){     //skip
                    unoClientNext = this.getNextClient(unoClientNext);
                }           
                if(a2 === 'r'){     //reverse direction
                    this.direction = !this.direction;
                    unoClientNext = this.getNextClient(unoClient);
                }                                  
                if(unoClientNext instanceof UNOClient){
                    UNOClient.setArrayTurn(this.clientRepository.findAll(), false);
                    unoClientNext.setTurn(true);
                }
                if(unoClient.getCardsCount() === 0){
                    UNOClient.setArrayTurn(this.clientRepository.findAll(), false);
                    UNOClient.setArrayHasWon(this.clientRepository.findAll(), false);                    
                    UNOClient.setArrayReady(this.clientRepository.findAll(), false);  

                    unoClient.setHasWon(true);                          
                    UNOClient.calculateScores(this.clientRepository.findAll());
                }
            }
        }else{            
            let unoClientNext = this.getNextClient(unoClient);
            if(unoClientNext instanceof UNOClient){
                UNOClient.setArrayTurn(this.clientRepository.findAll(), false);
                unoClientNext.setTurn(true);
            }
        }
    }
    cardCanBePlaced(card){
        let current = this.discardDeck.slice(-1)[0];
        if(typeof current === 'undefined')return false;

        let a1 = card.charAt(0);
        let a2 = card.charAt(1);
        let b1 = current.charAt(0);
        let b2 = current.charAt(1);

        //Check if card is allowed
        if(a2 === 'g'       //kg (rg,yg,bg,gg)
            || a2 === 'c'   //kc (rc,yc,bc,gc)
            || a1 === b1
            || a2 === b2){

                return true;
        }
        return false;
    }
    place(unoClient, card){
        
        if(!unoClient.getTurn())return false;

        if(unoClient.getTakeOrLeave()){
            card = unoClient.getTakeOrLeave();
        }

        let current = this.discardDeck.slice(-1)[0];
        if(typeof current === 'undefined')return;

        let a1 = card.charAt(0);
        let a2 = card.charAt(1);
        let b1 = current.charAt(0);
        let b2 = current.charAt(1);

        //Check if card is allowed
        if(this.cardCanBePlaced(card)){

            //Remove card from players hand and place it into discard deck
            let clientCard = card;
            if(a2 == 'g'){
                clientCard = 'kg';
            }
            if(a2 == 'c'){
                clientCard = 'kc';
            }            
            if(unoClient.getTakeOrLeave() || unoClient.takeCard(clientCard)){
                this.discardDeck.push(card);
                this.finishTurn(unoClient, card);
            }
        }
    }
    take(unoClient){
        if(unoClient.getTurn()){

            if(unoClient.getTakeOrLeave()){
                unoClient.addCard(unoClient.getTakeOrLeave());
                this.finishTurn(unoClient);
                return;
            }
            
            let card = this.drawDeck.shift();

            if(this.drawDeck.length == 0){
                this.reShuffleDeck();
            }

            if(this.cardCanBePlaced(card) && !unoClient.getTakeOrLeave()){
                unoClient.setTakeOrLeave(card);
            }else{
                unoClient.addCard(card);
                this.finishTurn(unoClient);
            }
        }
    }
    takeCard(unoClient){
        //Check for empty draw deck
        unoClient.addCard(this.drawDeck.shift());
    }
    getDrawDeckCount(){
        return this.drawDeck.length;
    }
    getDiscardDeck(){
        return this.discardDeck;
    }
};