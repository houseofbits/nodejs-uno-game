<template>
    <div>

        <Authorize :client="state.client" :socket="socket"></Authorize>

        <div v-if="state.client.code">

            <Board>

                <Scores :clients="state.clients.clients"></Scores>

                <DiscardPile :data="state.game.discardDeck"></DiscardPile>

                <DrawPile :count="state.game.drawDeckCount" :socket="socket" :client="state.client"></DrawPile>

                <Player :client="state.client" :socket="socket"></Player>

                <Opponent v-for="(oppo, index) in opponents" :data="oppo" :position="getOpponentPosition(index)" :key="index"></Opponent>

                <PopupReady v-if="!state.game.winner && !state.game.ready" :buttonHandler="ready" :showButton="!state.client.ready" ></PopupReady>

                <PopupWon v-if="state.game.winner" :buttonHandler="ready" :winner="state.game.winner"></PopupWon>

                <PopupSpecial v-if="false" :clickHandler="ready" type="c"></PopupSpecial>

                <PopupTake v-if="false" card="r1" :takeHandler="null" :leaveHandler="null"></PopupTake>

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
    import testData from "../public/testData.json"

    import PopupReady from "./components/PopupReady"    
    import PopupWon from "./components/PopupWon"    
    import PopupSpecial from "./components/PopupSpecial"    
    import PopupTake from "./components/PopupTake"    

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
                error:'',
                config:{
                    discardPilePosition:{x:350, y:300},
                    drawPilePosition:{x:50, y:300}
                }
            }
        },
        components: {
            Authorize, Board, Player, Opponent, DiscardPile, DrawPile, ErrorMessage, Scores,

            PopupReady,PopupWon,PopupSpecial,PopupTake
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
                this.state = response;
            },
            ready:function () {
                this.state.client.ready = true;
                this.socket.emit('begin', {'client': this.state.client});
            },            
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