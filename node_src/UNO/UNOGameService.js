let GameService = require('../GameService.js');

let GameRulesModel2 = require('./GameRulesModel2.js');
let UNOClient = require('./UNOClient.js');
let UNOClientRepository = require('./UNOClientRepository.js');
let MessageRepository = require('../MessageRepository.js');
let LoginActionHandler = require('./LoginActionHandler.js');
let BeginActionHandler = require('./BeginActionHandler.js');
let PlaceCardActionHandler = require('./PlaceCardActionHandler.js');
let TakeCardActionHandler = require('./TakeCardActionHandler.js');
let ClientResponseBuilder = require('./ClientResponseBuilder.js');

module.exports = class UNOGameService extends GameService{
    constructor(id) {
        super(id, new MessageRepository(), new UNOClientRepository());
        
        this.gameRulesModel = new GameRulesModel2(this.getClientRepository());
        this.clientResponseBuilder = new ClientResponseBuilder(this.getClientRepository(), this.getGameRulesModel());

        this.actionHandlers.login = new LoginActionHandler(this);
        this.actionHandlers.begin = new BeginActionHandler(this);
        this.actionHandlers.place = new PlaceCardActionHandler(this);
        this.actionHandlers.take = new TakeCardActionHandler(this);
    }
    getClientResponseData(socketId){
        let client = this.getClientRepository().findBySocketId(socketId);
        if(client instanceof UNOClient) {
            return this.clientResponseBuilder.build(client);
        }
        return false;
    }   
    getGameRulesModel(){
        return this.gameRulesModel;
    }    
};