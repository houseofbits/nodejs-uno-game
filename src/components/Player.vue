<template>
    <div>
        <div class="player">
            
            <div class="hand-cards-transform">
                <div v-if="client.turn">
                    <div class="card-active-border" v-for="(card, index) in cards" :style="transform(card)" :key="index"></div>
                </div>
                <CardActive v-for="(card, index) in cards" :data="card" :key="index" :clickHandler="playHandler"></CardActive>
            </div>

            <div class="client-name" :class="{active:client.turn}">
                <span>{{client.name}}</span>
            </div>

        </div>      
    </div>
</template>

<script>

    import CardActive from "./CardActive"
    import Card from "./Card"
    import NamePlate from "./NamePlate"

    export default {
        name: "Player",
        props: ['client', 'playHandler'],
        components: {
            CardActive, Card, NamePlate
        },
        data: function() {
            return {
            }
        },
        computed:{
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
            transform:function (card) {
                return { transform: ' rotate('+card.angle+'deg) translate('+card.x+'px,'+card.y+'px)' };
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
     .card-active-border{
        top:0;
        left:0;
        display:block;
        border-radius:8px;
        transform-origin: 46px 70px;
        display:block;
        position:absolute;
        width:93px;
        height:140px;
        box-shadow: 0px 0px 1px 5px rgba(255,234,0,1);
    }
</style>