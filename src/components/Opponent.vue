<template>
    <div class="opponet" :style="{left: position}">

        <div class="oppo-cards">
            <div class="playing_card back" v-for="(card, index) in cards" :style="transform(card)" :key="index"></div>
        </div>

        <div class="oppo-name" :class="{active:data.turn}">
            <span>{{this.data.name}}</span>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Opponent",
        props: ['data', 'position'],
        computed:{
            cards:function(){
                let cards = [];

                let cardsCount = this.data.cardsCount;

                let angleRange = (cardsCount * 30) / 7;

                angleRange = Math.min(angleRange, 40);

                let angleMin = -(angleRange / 2);
                let angleMax = (angleRange / 2);
                let angleStep = (angleMax - angleMin) / (cardsCount - 1);
                let angle = angleMin;                

                for(let i=0;i<cardsCount; i++){
                    
                    cards.push(
                        {
                            x:0,
                            y:0,
                            angle:angle
                        }
                    );
                    angle += angleStep;
                }                

                return cards;
            }
        },
        methods:{
            transform:function (card) {
                return { transform: ' rotate('+card.angle+'deg) translate('+card.x+'px,'+card.y+'px)' };
            }            
        }
    }
</script>

<style scoped>
    .opponet{
        position:absolute;
        width:200px;
        height:100px;
        top:20px;
        left:0;
    }
    .oppo-cards{
        position:absolute;
        left:75px;
    }
    .playing_card{
        top:0;
        left:0;
        transform-origin: 22px 200px;
        display:block;
        position:absolute;
        border:solid 1px #555555;
        border-radius:8px;
        width:45px;
        height:70px;
        box-shadow:-3px -4px 3px rgba(0,0,0,0.3);
    }
    .back{
        background:url('../../public/img/back.png') no-repeat;
        background-size:100% 100%;
    }    

    .oppo-name{
        width:100%;
        height:23px;
        line-height:23px;
        position:absolute;
        left:0;
        bottom:0;
        text-align: center;
        vertical-align: top;
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        font-size: 23px;
        letter-spacing: 0px;
        word-spacing: 0.2px;
        font-weight: 700;
        /*text-shadow: -1px -1px 1px rgba(255,255,255,.1), 1px 3px 4px rgba(0,0,0,.7); */
        filter: drop-shadow(0px 5px 3px black);
        background: linear-gradient(to bottom, rgba(252,234,187,1) 0%, rgba(252,205,77,1) 61%, rgba(248,181,0,1) 62%, rgba(251,223,147,1) 100%);
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .oppo-name span{
        line-height: 25px;
        border-bottom:solid 4px rgba(252,205,77,.3);
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 7px;
    }
    .oppo-name.active span{
        background: linear-gradient(to bottom, rgba(241,231,103,0) 0%, rgba(254,182,69,0.2) 100%);
        border-bottom:solid 4px rgba(255, 251, 0, 0.8);
    }    
</style>