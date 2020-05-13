<template>
    <div class="discard-pos">
        <Card v-for="(card, index) in cards" :data="card" :key="index"></Card>
    </div>
</template>

<script>

    import Card from "./CardActive"

    export default {
        name: "DiscardPile",
        props: ['data'],
        components: { Card },
        data: function() {
            return {
                cards:[]
            }
        },
        methods:{
            addCard:function (card) {
                this.cards.push({
                    type:card,
                    x:(10 - (Math.random()*20)),
                    y:(10 - (Math.random()*20)),
                    angle:(10 - (Math.random()*20))
                });
            }         
        },
        watch: {
            data: function(newVal, oldVal) {

                if(typeof this.cards[0] === 'undefined' 
                    || newVal[0] !== oldVal[0]
                    || oldVal.length > newVal.length){
                    this.cards = [];
                }
                for(let i=0;i<newVal.length; i++){
                    if(typeof this.cards[i] === 'undefined' || this.cards[i].type !== newVal[i]){
                       this.addCard(newVal[i]); 
                    }
                }               
            }
        },
        mounted:function(){
            for(let i=0; i<this.data.length; i++){
                this.addCard(this.data[i]);
            }            
        }
    }
</script>

<style scoped>
    .discard-pos{
        position:absolute;
        top:150px;
        left:340px;
    }
</style>