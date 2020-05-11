let ClientRepository = require('./UNO/UNOClientRepository.js');
let Client = require('./Client.js');
let UNOClient = require('./UNO/UNOClient.js');

const assert = require('assert');

module.exports = class UnitTest{
    constructor(){
        
        this.clientRepo();
        this.unoClient();

    }    
    clientRepo(){

        let repo = new ClientRepository();
        
        repo.insert(new UNOClient("Janis"));
        repo.insert(new UNOClient("Rainis"));
        repo.insert(new UNOClient("Dace"));

        assert.strictEqual(repo.count(), 3);

        let cl = repo.get(0);
        assert.strictEqual(cl.getName(), "Janis");

        let cl2 = repo.findNext(cl);
        assert.strictEqual(cl2.getName(), "Rainis");

        let cl3 = repo.findPrevious(cl);
        assert.strictEqual(cl3.getName(), "Dace");
    }
    unoClient(){

        let repo = new ClientRepository();
        
        repo.insert(new UNOClient("Janis"));
        repo.insert(new UNOClient("Rainis"));
        repo.insert(new UNOClient("Dace"));

        let cl = repo.get(0);

        assert.strictEqual(cl.getTurn(), false);

        UNOClient.setArrayTurn(repo.findAll(), true);

        assert.strictEqual(cl.getTurn(), true);

    }

};