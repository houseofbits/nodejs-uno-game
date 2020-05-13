<template>
    <div>
        <div class="draw-pos">
            <div v-for="(card, index) in cards" class="playing_card back" :style="transform(card)" :key="index" @click="takeCard"></div>
        </div>
        <div v-if="client.takeOrLeave" class="popup-pos">
            <div class="popup-before"></div>
            <div class="popup">
                <div class="card-row">
                    <CardBase :type="client.takeOrLeave"></CardBase>
                </div>
                <div class="row">
                    <div class="big-yellow-button" @click="playCard"><i class="fa fa-arrow-circle-up"></i> Place</div>
                    <div class="big-yellow-button" @click="takeCard"><i class="fa fa-arrow-circle-down "></i> Take</div>
                </div>
            </div>
            <div class="popup-after"></div>            
        </div>     
    </div>
</template>

<script>
    import CardBase from "./CardBase"    

    export default {
        name: "DrawPile",
        props:['count', 'socket', 'client'],
        components:{CardBase},
        data: function() {
            return {
                cards:[]
            }
        },
        methods:{
            transform:function (card) {
                return { transform: 'translate('+card.x+'px,'+card.y+'px) rotate('+card.angle+'deg)' };
            },
            takeCard:function(){
                this.socket.emit('take', {'client': this.client});                
            },
            playCard:function(){
                this.socket.emit('place', {'client': this.client, card:this.client.takeOrLeave});                
            }            
        },
        watch: {
            count: function(newVal, oldVal) {
                while(this.cards.length < newVal){
                    this.cards.push({
                        x:0,
                        y:0,
                        angle:(5 - (Math.random()*10))
                    });
                }
                while(this.cards.length > newVal){
                    this.cards.pop();
                }
            }
        },
        mounted:function(){
            while(this.cards.length < this.count){
                this.cards.push({
                    x:0,
                    y:0,
                    angle:(5 - (Math.random()*10))
                });
            }
        }
    }
</script>

<style scoped>
    .draw-pos{
        position:absolute;
        top:170px;
        left:180px;
        transform: rotateZ(-5deg);
    }
    .playing_card{
        transform-origin: 46px 70px;
        display:block;
        position:absolute;
        border:solid 1px #555555;
        border-radius:8px;
        width:93px;
        height:140px;
        box-shadow:-3px -4px 3px rgba(0,0,0,0.3);
    }
    .back{
        background:url('../../public/img/back.png') no-repeat;
        background-size:100% 100%;
    }
   .popup-pos{
        position:relative;
        top:80px;
        z-index: 1000;
    }
    .popup{
        width:100%;
        height:240px;
        line-height:80px;
        position:relative;
        left:0;
        top:0;
        background: rgba(0,0,0,0.6);
    }
    .popup-before{
        content:"";
        display: block;
        width:100%;
        height:20px;
        top:0;
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
        position:relative;
    }
    .popup-after{
        content:"";
        display: block;
        width:100%;
        height:20px;
        bottom:0;
        background: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
        position:relative;
    }
    .big-yellow-button {
        font-family: 'Ubuntu', georgia;
        text-align: center;
        line-height: 61px;
		border-radius: 35px;
		box-sizing: border-box;
		font-size: 35px;
		text-decoration: none;
		color: green;
		font-weight: bold;
		font-family: arial;
        filter: drop-shadow(0px 5px 3px black);
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.54) inset, 0 -2px 1px rgba(0, 0, 0, 0.31) inset;
		background: #ffbf00;
		background: linear-gradient(to bottom,  #ffbf00 0%,#ff9700 100%);
        box-shadow: 0px 10px 32px -6px rgba(0,0,0,0.75);
        text-shadow: 0px 1px 1px white;
        position:relative;
      	display: block;
		width: 155px;
		height: 61px;
        text-align: center;
        border:solid 1px blue;
        float:left;
        margin-left:20px;
        margin-right:20px;
    }    
    .big-yellow-button:after {
        content: '';
        border-radius: 38px;
        position: absolute;
        top: -6px;
        left: -6px;
        bottom: -6px;
        right: -6px;
        border:solid 6px rgba(255, 255, 255, 0.4);
    }
    .big-yellow-button:hover {
        background: #ffdc00;
        background: linear-gradient(to bottom,  #ffdc00 0%,#ffa700 100%);
        text-shadow: none;
    }
    .big-yellow-button:active {
        padding-top:2px;
        background: #ff9100;
        background: linear-gradient(to bottom,  #ff9100 0%,#ffb300 100%);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.32) inset, 0 -1px 0px white inset;
        text-shadow: none;    
    }  
    .row{
        position:relative;
        text-align: center;
        height:61px;
        margin:auto;
        width:390px;
        bottom:0px;
    }
    .card-row{
        position:relative;
        text-align: center;
        margin:auto;
        width:93px;
        height:170px;
        top:10px;
    }        
</style>