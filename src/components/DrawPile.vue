<template>
    <div class="draw-pos">
        <div v-for="(card, index) in cards" class="playing_card back" :style="transform(card)" :key="index" @click="takeCard"></div>
    </div>
</template>

<script>
    export default {
        name: "DrawPile",
        props:['count', 'socket', 'client'],
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
</style>