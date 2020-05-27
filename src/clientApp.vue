<template>
    <div>

        <Authorize :client="state.client" :socket="socket"></Authorize>

        <div v-if="state.client.code">

            <Board>

                <Scores :clients="state.clients.clients"></Scores>

                <DiscardPile :data="state.game.discardDeck"></DiscardPile>

                <DrawPile :count="state.game.drawDeckCount" :takeHandler="takeCard"></DrawPile>

                <Player :client="state.client" :playHandler="playCard"></Player>

                <Opponent v-for="(oppo, index) in opponents" :data="oppo" :position="getOpponentPosition(index)" :key="index"></Opponent>
                
                <AnimateState :animate="animate" :state="state" :newState="newState" :finishHandler="animationFinished"></AnimateState>

                <AnimateLocal type="rn" :animate="animate"></AnimateLocal>

                <PopupReady v-if="!state.game.winner && !state.game.ready" :buttonHandler="ready" :showButton="!state.client.ready"></PopupReady>

                <PopupWon v-if="state.game.winner" :buttonHandler="ready" :winner="state.game.winner" :showButton="!state.client.ready"></PopupWon>

                <PopupSpecial v-if="showSpecial" :clickHandler="playCard" :type="specialType"></PopupSpecial>

                <PopupTake v-if="!showSpecial && state.client.takeOrLeave" :card="state.client.takeOrLeave" :takeHandler="takeCard" :leaveHandler="playCard"></PopupTake>

            </Board>

        </div>

        <ErrorMessage :messages="state.messages"></ErrorMessage>
    
    </div>
</template>

<script>

    import socket from 'socket.io-client'
    import Board from "./components/Board"
    import Player from "./components/Player"
    import Opponent from "./components/Opponent"
    import Authorize from "./components/Authorize"
    import DiscardPile from "./components/DiscardPile"
    import DrawPile from "./components/DrawPile"
    import ErrorMessage from "./components/ErrorMessage"
    import Scores from "./components/Scores"    
    import PopupReady from "./components/PopupReady"    
    import PopupWon from "./components/PopupWon"    
    import PopupSpecial from "./components/PopupSpecial"    
    import PopupTake from "./components/PopupTake"    
    import testData from "../public/testData.json"
    import AnimateState from "./components/AnimateState"    
//    import AnimateLocal from "./components/AnimateLocal"    

    export default {
        name: "clientApp",
        data: function() {
            return {
                //socket: socket('http://localhost:3000'),
                //socket: socket('http://192.168.0.140:80'),                
                socket: socket("http://" + window.location.hostname + ":80"),
                state: {
                    client:{
                        code:null,
                        name:'',
                        ready:false,
                        turn:false,
                        cards:[]
                    },
                    clients:{
                        clients:[]
                    },
                    game:{
                        discardDeck:[],
                        drawDeckCount:0,
                        winner:false,
                        ready:true
                    },
                    messages:[],
                },
                newState:null,
                animate:false,
                error:'',
                showSpecial:false,
                specialType:'',
            }
        },
        components: {
            Authorize, Board, Player, Opponent, DiscardPile, DrawPile, ErrorMessage, Scores,
            PopupReady,PopupWon,PopupSpecial,PopupTake,AnimateState
        },
        computed:{
            opponents:function(){
                let oppo = [];
                for(let i=0; i<this.state.clients.clients.length; i++){
                    if(this.state.clients.clients[i].name !== this.state.client.name){
                        oppo.push(this.state.clients.clients[i]);
                    }
                }
                return oppo;
            }
        },
        methods:{
            getOpponentPosition(index){
                let count = this.state.clients.clients.length - 1;
                let marg = 800 / count;
                return ((marg / 2) + (index * marg)) - 100 + "px";
            },
            gameStateResponse:function(response){
                if(this.state.client.code){
                    this.newState = response;
                    this.animate = true;
                }else{
                    this.state = response;
                }
            },
            ready:function () {
                this.state.client.ready = true;
                this.socket.emit('begin', {'client': this.state.client});
            },            
            playCard:function(card){
                if(card === 'kc'){
                    this.showSpecial = true;
                    this.specialType = 'c';
                }else if(card === 'kg'){
                    this.showSpecial = true;
                    this.specialType = 'g';
                }else{
                    this.showSpecial = false;
                    this.socket.emit('place', {'client': this.state.client, card:card});
                }
            },
            takeCard:function(){
                this.socket.emit('take', {'client': this.state.client});
            },
            animationFinished:function(){
                this.animate = false;
                if(this.newState){
                    this.state = this.newState;
                    this.newState = null;
                }
            }
        },
        mounted:function () {
            this.socket.on('state', this.gameStateResponse);

            this.state = testData;

            //console.log(window.location.hostname);

        },
        beforeDestroy:function () {
            this.socket.disconnect();
        }

    }
</script>

<style scoped>

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