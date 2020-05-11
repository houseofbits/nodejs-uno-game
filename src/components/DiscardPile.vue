<template>
    <div class="discard-pos">
        <Card v-for="(card, index) in cards" :data="card" :key="index"></Card>
    </div>
</template>

<script>

    import Card from "./Card"

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
                let newItems = newVal.filter(x => !oldVal.includes(x));
                for(let i=0; i<newItems.length; i++){
                    this.addCard(newItems[i]);
                }
                while(this.cards.length > newVal.length){
                    this.cards.shift();
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
        top:160px;
        left:340px;
    }
</style>