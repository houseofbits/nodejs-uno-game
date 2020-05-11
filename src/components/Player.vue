<template>
    <div>
        <div class="player">
            
            <div class="hand-cards-transform">
                <Card v-for="(card, index) in cards" :data="card" :key="index" :clickHandler="placeCard"></Card>
            </div>

            <div class="client-name" :class="{active:client.turn}">
                <span>{{client.name}}</span>
            </div>

        </div>
        <div v-if="showSpecial" class="popup-pos">
            <div class="popup-before"></div>
            <div class="popup">
                <Card v-for="(card, index) in specialCards" :data="card" :key="index" :clickHandler="placeCard"></Card>
            </div>
            <div class="popup-after"></div>            
        </div>
    </div>
</template>

<script>

    import Card from "./Card"
    import NamePlate from "./NamePlate"

    export default {
        name: "Player",
        props: ['client', 'socket'],
        components: {
            Card, NamePlate
        },
        data: function() {
            return {
                showSpecial:false,
                specialType:''
            }
        },
        computed:{
            specialCards:function(){
                let cards = [];

                cards.push({type:'r'+this.specialType,x:200,y:30,angle:0});
                cards.push({type:'y'+this.specialType,x:300,y:30,angle:0});
                cards.push({type:'g'+this.specialType,x:400,y:30,angle:0});
                cards.push({type:'b'+this.specialType,x:500,y:30,angle:0});

                return cards;
            },
            cards:function(){
                let cards = [];
                this.client.cards.sort();

                let cardsCount = this.client.cards.length;

                let angleRange = (cardsCount * 30) / 7;

                angleRange = Math.min(angleRange, 50);

                let angleMin = -(angleRange / 2); //-20;
                let angleMax = (angleRange / 2); //20;
                let angleStep = (angleMax - angleMin) / (this.client.cards.length - 1);
                let angle = angleMin;                

                for(let i=0; i<this.client.cards.length; i++){
                    cards.push({
                        type:this.client.cards[i],
                        x:0,
                        y:-600,
                        angle:angle
                    });
                    angle += angleStep;
                }
                return cards;
            }
        },
        methods:{
            placeCard:function(card){
                if(card === 'kc'){
                    this.showSpecial = true;
                    this.specialType = 'c';
                }else if(card === 'kg'){
                    this.showSpecial = true;
                    this.specialType = 'g';
                }else{
                    this.showSpecial = false;
                    this.socket.emit('place', {'client': this.client, card:card});
                }
            }
        },
    }
</script>

<style scoped>
    .player{
        position: absolute;
        bottom: 0px;
        left:0px;
        width:800px;
        height:200px;
    }
    button{
        display: block;
        padding:5px;
        background: #009900;
        border-radius:5px;
        color:#99FF00;
        font-weight:bold;
        line-height:10px;
        float:right;
        width:auto;
        margin:5px;
        padding-left: 10px;
        padding-right: 10px;
        cursor: pointer;
        text-shadow:0 1px 2px rgba(0,0,0, 0.5);
        background: -webkit-gradient(linear, left top, left bottom, from(#0d9806), to(#509440));
        background: -moz-linear-gradient(top,  #0d9806,  #509440);
        background-image: -o-linear-gradient(top ,  #0d9806,  #509440);
        border-top:solid 1px #fff947;
        border-bottom:solid 1px #006633;
    }
    .client-name{
        width:100%;
        height:35px;
        line-height:35px;
        position:absolute;
        left:0;
        bottom:25px;
        text-align: center;
        vertical-align: top;
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        font-size: 28px;
        letter-spacing: 0px;
        word-spacing: 0.2px;
        font-weight: 700;
        /*text-shadow: -1px -1px 1px rgba(255,255,255,.1), 1px 3px 4px rgba(0,0,0,.7);*/
        filter: drop-shadow(0px 5px 3px black);
        background: linear-gradient(to bottom, rgba(252,234,187,1) 0%, rgba(252,205,77,1) 61%, rgba(248,181,0,1) 62%, rgba(251,223,147,1) 100%);
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .client-name span{
        line-height: 25px;
        border-bottom:solid 4px rgba(252,205,77,.3);
        padding-left: 30px;
        padding-right: 30px;
        border-radius: 7px;
    }
    .hand-cards-transform{
        position: absolute;
        transform: translate(350px,580px);
    }
    .client-name.active span{
        background: linear-gradient(to bottom, rgba(241,231,103,0) 0%, rgba(254,182,69,0.2) 100%);
        border-bottom:solid 4px rgba(255, 251, 0, 0.8);
    }

    .ready {
        top:30px;
        left:245px;
        font-family: 'Ubuntu', georgia;
        text-align: center;
      	display: block;
		width: 200px;
		height: 61px;
		border-radius: 35px;
		box-sizing: border-box;
		font-size: 35px;
		padding: 9px 49px;
		text-decoration: none;
		color: green;
		font-weight: bold;
		font-family: arial;
		/*text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);*/
        filter: drop-shadow(0px 5px 3px black);
		position: absolute;
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.54) inset, 0 -2px 1px rgba(0, 0, 0, 0.31) inset;
		background: #ffbf00;
		background: linear-gradient(to bottom,  #ffbf00 0%,#ff9700 100%);

        box-shadow: 0px 10px 32px -6px rgba(0,0,0,0.75);
    }

    .ready:after {
        content: '';
        border-radius: 35px;
        position: absolute;
        top: -6px;
        left: -6px;
        bottom: -6px;
        right: -6px;
        border:solid 6px rgba(255, 255, 255, 0.4);
    }

    .ready:hover {
            background: #ffdc00;
            background: linear-gradient(to bottom,  #ffdc00 0%,#ffa700 100%);
    }

    .ready:active {
        padding-top:10px;
            background: #ff9100;
            background: linear-gradient(to bottom,  #ff9100 0%,#ffb300 100%);
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.32) inset, 0 -1px 0px white inset;
    }    

    .special-card{
        position:absolute;
        background-color: rgba(0, 0, 0, 0.5);
        width:100%;
        height:230px;
        bottom:0;
    }
    .popup-pos{
        position:relative;
        top:80px;
    }
    .popup{
        width:100%;
        height:200px;
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
</style>