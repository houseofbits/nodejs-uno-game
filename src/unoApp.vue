<template>
    <div class="frame">
        <Authorize :client="state.client" :socket="socket"></Authorize>

        <Board v-if="state.client.code">
            
            <Scores :clients="state.clients"></Scores>

            <Card v-for="card in state.game.cards" 
                    :ref="'card'+card.id"
                    :card="card"
                    :key="card.id"
                    :clickHandler="cardOnClick"
                    :transitionFinishHandler="cardTransitionFinish"
                    :timeline="config.timeline"
                    :active="state.client.turn"></Card>

            <div v-if="config.playersInitialized" >
                <NamePlate v-for="(client, index) in state.clients" :key="'client_'+index" :client="client" :position="namePosition(client.name)"></NamePlate>
            </div>

        </Board>
        <div class="board-overlay" v-if="overlayVisible">

            <PopupReady v-if="!state.game.winner && !state.game.ready" :buttonHandler="ready" :showButton="!state.client.ready"></PopupReady>

            <PopupWon v-if="state.game.winner" :buttonHandler="ready" :winner="state.game.winner" :showButton="!state.client.ready"></PopupWon>

            <PopupSpecial v-if="config.specialCard" :clickHandler="playCardSpecial" :card="config.specialCard"></PopupSpecial>

            <PopupTake v-if="!config.specialCard && state.client.takeOrLeave" :card="state.client.takeOrLeave" :takeHandler="takeCard" :leaveHandler="playCardTOL"></PopupTake>

        </div>
    </div>
</template>

<script>

    import socket from 'socket.io-client'
    import Authorize from "./components/Authorize"
    import Board from "./components/Board"
    import Card from "./comp2/Card"    
    import PopupReady from "./components/PopupReady"    
    import PopupWon from "./components/PopupWon"    
    import PopupSpecial from "./components/PopupSpecial"    
    import PopupTake from "./components/PopupTake"   
    import NamePlate from "./comp2/NamePlate"    
    import Scores from "./components/Scores"   

    import testDataNew from "../public/testDataNew.json"

    import gsap from "gsap";

    const OWNER_DRAW_DECK = "draw"
    const OWNER_DISCARD_DECK = "dsc"    

    export default {
        name: "unoApp",
        data: function() {
            return {
                socket: socket('http://localhost:3000'),
                state:{
                    client:{
                        name:'',
                        code:null
                    },
                    clients:[],
                    game:{
                        cards:[],
                        events:[]
                    },
                },
                config:{
                    initialized:false,
                    playersInitialized:false,
                    drawPos:{x:200,y:170},
                    discardPos:{x:400,y:170},
                    players:{},
                    timeline:null,
                    specialCard:false,
                },
            }
        },
        components: {
            Board, Card, Authorize, PopupReady, PopupWon,PopupSpecial,PopupTake,NamePlate,Scores
        },
        computed:{
            self:function(){
                return this.state.client.name;
            },
            selfConfig:function(){
                return this.config.players[this.state.client.name];
            },
            overlayVisible:function(){
                return this.state.client.code 
                    && ((!this.state.game.winner && !this.state.game.ready) 
                    || this.state.game.winner
                    || this.config.specialCard
                    || (!this.config.specialCard && this.state.client.takeOrLeave)
                    ); 
            }            
        },
        methods:{        
            namePosition:function(clientName){
                if(typeof this.config.players[clientName] !== 'undefined'){  
                    let pos = this.config.players[clientName];              
                    if(clientName === this.self){
                        return {
                            x:pos.x,
                            y:pos.y + 155
                        };
                    }else{
                        return {
                            x:pos.x,
                            y:pos.y + 120
                        };
                    }
                }
            },              
            ready:function () {
                this.state.client.ready = true;
                this.socket.emit('begin', {'client': this.state.client});
            },  
            playCard:function(card){
                if(card.type === 'kc' || card.type === 'kg'){
                    this.config.specialCard = card;
                }else{
                    this.state.client.turn = false;
                    this.cardSetOwner(card, OWNER_DISCARD_DECK); 
                    this.config.specialCard = false;
                    this.socket.emit('place', {'client': this.state.client, card:card});
                }
            },
            playCardSpecial:function(cardId, type){
                let card = this.state.game.cards.find(function(elem){
                    return elem.id == cardId;
                });
                if(typeof card !== 'undefined'){
                    card.type = type;
                    this.playCard(card);
                }
            },
            playCardTOL:function(cardId){
                let card = this.state.game.cards.find(function(elem){
                    return elem.id == cardId;
                });
                if(typeof card !== 'undefined'){
                    this.playCard(card);
                }                
            },
            takeCard:function(){
                this.socket.emit('take', {'client': this.state.client});
            },            
            cardSetOwner:function(card, owner){

                switch(owner){
                    case OWNER_DRAW_DECK:
                        this.transitionToDrawDeck(card);
                    break;
                    case OWNER_DISCARD_DECK:
                        this.transitionToDiscardDeck(card);                    
                    break;
                    default:
                         this.transitionToHand(card, owner);              
                };
            },
            transitionToDrawDeck:function(card){

                card.owner = OWNER_DRAW_DECK;

                card.transform.x = this.config.drawPos.x + (5 - (Math.random()*10));
                card.transform.y = this.config.drawPos.y + (5 - (Math.random()*10));
                card.transform.angle = (5 - (Math.random()*10));
                card.transform.z = 150 + card.moveId;
                card.transform.scale = 1;
                card.transform.d = 0;
            },
            transitionToDiscardDeck:function(card){

                card.owner = OWNER_DISCARD_DECK;

                card.transform.x = this.config.discardPos.x + (10 - (Math.random()*20));
                card.transform.y = this.config.discardPos.y + (10 - (Math.random()*20));
                card.transform.angle = (10 - (Math.random()*20));
                card.transform.z = 200;
                card.transform.scale = 1;
                card.transform.d = 0.4;
            },
            transitionToHand:function(card, owner){
                if(typeof this.config.players[owner] !== 'undefined'){
                    
                    let config = this.config.players[owner];

                    card.owner = owner;

                    card.transform.x = config.x + (5 - (Math.random()*10));
                    card.transform.y = config.y + (5 - (Math.random()*10));
                    card.transform.z = 300;
                    card.transform.angle = (10 - (Math.random()*20));
                    card.transform.scale = config.scale;
                    card.transform.d = 0.3;
                }
            },
            cardOnClick:function(card){

                if(card.owner == OWNER_DRAW_DECK && card.nextMoveValid && this.state.client.turn){

                    this.takeCard();

                    this.cardSetOwner(card, this.self);

                    this.state.client.turn = false;

                }else if(card.owner == this.self && card.nextMoveValid){
                    this.playCard(card);                    
                }
            },
            cardTransitionFinish:function(card){
                for(let i=0; i<this.state.clients.length; i++){
                    this.updateHand(this.state.clients[i].name);
                }    
            },
            initDeck:function(data){                 
                this.state.game.cards = data;
                for(let i=0; i<this.state.game.cards.length; i++){                    
                    this.cardSetOwner(this.state.game.cards[i], this.state.game.cards[i].owner);                               
                }                 
            },
            updateHand:function(player){
                let clientCards = [];
                for(let i=0; i<this.state.game.cards.length; i++){
                    if(this.state.game.cards[i].owner == player){
                        clientCards.push(this.state.game.cards[i]);
                    }
                }

                clientCards.sort(function(a,b){
                    if(a.type < b.type)return -1;
                    if(a.type > b.type)return 1;                    
                    return 0;
                });

                let config = this.config.players[player];

                let scale = (player === this.self)?1:0.6;

                let pivotSetting = (player === this.self)?400:200;

                let cardsCount = clientCards.length;
                let angleRange = (cardsCount * 30) / 7;
                angleRange = Math.min(angleRange, 50);
                let angleMin = -(angleRange / 2);
                let angleMax = (angleRange / 2);
                let angleStep = (angleMax - angleMin) / (cardsCount - 1);
                let angle = angleMin;     

                let posZ = 50;

                for(let i=0; i<clientCards.length; i++){

                    let cosi = (1 - Math.cos(angle * (Math.PI / 180))) * pivotSetting;
                    let sini = (Math.sin(angle * (Math.PI / 180))) * pivotSetting;

                    clientCards[i].transform.angle = angle;
                    if(typeof config !== 'undefined'){
                        clientCards[i].transform.x = config.x + sini;
                        clientCards[i].transform.y = config.y + cosi;
                    }
                    clientCards[i].transform.z = posZ;
                    clientCards[i].transform.scale = scale;
                    clientCards[i].transform.d = 0.05;

                    posZ++;
                    angle += angleStep;
                }
            },
            updateDiscardDeck:function(){
                let clientCards = [];
                for(let i=0; i<this.state.game.cards.length; i++){
                    if(this.state.game.cards[i].owner == OWNER_DISCARD_DECK){
                        clientCards.push(this.state.game.cards[i]);
                    }
                }
                clientCards.sort(function(a,b){
                    if(parseInt(a.moveId) < parseInt(b.moveId))return -1;
                    if(parseInt(a.moveId) > parseInt(b.moveId))return 1;                    
                    return 0;
                });

                let posZ = 0;
                for(let i=0; i<clientCards.length; i++){
                    clientCards[i].transform.z = posZ;
                    posZ++;
                }
            },            
            initPlayers:function(){                
                this.config.players = {};
                let count = this.state.clients.length - 1;
                let marg = 800 / count;
                let index = 0;
                for(let i=0; i<this.state.clients.length; i++){
                    if(this.state.clients[i].name == this.self){
                        this.config.players[this.state.clients[i].name] = {
                            x:400,
                            y:340,
                            scale:1
                        };
                    }else{
                       this.config.players[this.state.clients[i].name] = {
                            x:((marg / 2) + (index * marg)),
                            y:-20,
                            scale:0.6
                        };
                        index++;
                    }
                }
            },
            processEvents:function(){
                for(let i=0; i<this.state.game.events.length; i++){
                    let event = this.state.game.events[i];
                    if(typeof this.state.game.cards[event.cardId] !== 'undefined'){
                        this.cardSetOwner(this.state.game.cards[event.cardId], event.newOwner);
                    }
                }
            },
            updateState:function(cards){
                for(let i=0; i<this.state.game.cards.length; i++){
                    if(typeof cards[i] === 'undefined')continue;
                    if(cards[i].owner !== this.state.game.cards[i].owner){
                        this.cardSetOwner(this.state.game.cards[i], cards[i].owner);
                    }
                    this.state.game.cards[i].owner = cards[i].owner;
                    this.state.game.cards[i].type = cards[i].type;    
                    this.state.game.cards[i].moveId = cards[i].moveId;    
                    this.state.game.cards[i].nextMoveValid = cards[i].nextMoveValid;                    
                }
            },
            gameStateResponse(response){

                this.state.client = response.client;

                this.state.clients = response.clients;
                
                this.state.game.events = response.game.events;
                this.state.game.winner = response.game.winner;
                this.state.game.ready = response.game.ready;
                
                if(!this.config.initialized && response.game.cards.length > 0){
                    this.config.initialized = true;
                    this.initDeck(response.game.cards);
                
                }else if(this.config.initialized && response.game.events.length > 0){
                    if(!this.config.playersInitialized){
                        this.config.playersInitialized = true;
                        this.initPlayers();
                    }                    
                    this.processEvents();                    
                }
                this.updateState(response.game.cards);
                this.updateDiscardDeck();
            },
        },
        mounted:function () {

            this.socket.on('state', this.gameStateResponse);

            this.config.timeline = gsap.timeline();

            //this.gameStateResponse(testDataNew);

        },
        beforeDestroy:function () {

        }

    }
</script>

<style scoped>
    .frame{
        top:5px;
        position:relative;
        width:800px;
        height:540px;
        margin:0 auto;    
    }
    .board-overlay{
        position:absolute;
        width:100%;
        height:100%;
        transform: translateZ(500px);
    }
</style>

<style>
    body {
        background: #1b1b21 url('../public/img/page_bg.png') repeat-x;
        margin:0 auto;
        width:100%;
        font: 12px normal Verdana, Arial, Helvetica, sans-serif;
        user-select: none;
        overflow: hidden;
        transform: scale(1.0);
    }
    a{
        text-decoration:none;
        color:inherit;
    }   
</style>