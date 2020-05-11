let GameService = require('../GameService.js');

let GameRulesModel = require('./GameRulesModel.js');
let UNOClient = require('./UNOClient.js');
let UNOClientRepository = require('./UNOClientRepository.js');
let Message = require('../Message.js');
let MessageRepository = require('../MessageRepository.js');

let PublicGameRulesModel = require('./PublicGameRulesModel.js');
let PublicClientsModel = require('./PublicClientsModel.js');
let LoginActionHandler = require('./LoginActionHandler.js');
let BeginActionHandler = require('./BeginActionHandler.js');
let PlaceCardActionHandler = require('./PlaceCardActionHandler.js');
let TakeCardActionHandler = require('./TakeCardActionHandler.js');

module.exports = class UNOGameService extends GameService{

    constructor(id) {
        super(id,new MessageRepository(), new UNOClientRepository());
        
        this.gameRulesModel = new GameRulesModel(this.getClientRepository());

        this.actionHandlers.login = new LoginActionHandler(this);
        this.actionHandlers.begin = new BeginActionHandler(this);
        this.actionHandlers.place = new PlaceCardActionHandler(this);
        this.actionHandlers.take = new TakeCardActionHandler(this);
    }
    getClientResponseData(socketId){
        let client = this.getClientRepository().findBySocketId(socketId);
        if(client instanceof UNOClient) {
            return {
                client: client,
                clients: new PublicClientsModel(this.getClientRepository()),
                game: new PublicGameRulesModel(this.getGameRulesModel()),
                messages: this.getMessageRepository().findByClient(client)
            };
        }
        return false;
    }   
    getGameRulesModel(){
        return this.gameRulesModel;
    }    
};