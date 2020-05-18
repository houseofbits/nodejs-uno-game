<template>
    <div>
        <div class="redrect" ref="animable"></div>

        <div class="card-back" ref="cardHidden"></div>

    </div>
</template>

<script>
    export default {
        name: "AnimateState",
        props:['animate', 'state', 'newState', 'finishHandler', 'config'],
        data: function() {
            return {   }
        },
        watch:{
            animate:function(newVal){
                if(newVal && this.newState){

                    console.log(this.getClientCardsDiff());

                    this.$anime
                        .timeline()
                        .add({
                            targets:this.$refs.animable,
                            translateX: [0, 250],
                            begin:this.animationStart,
                            complete:this.animationFinish
                        });
                    
                    // this.state.client.cards.push('y1');
                    // this.newState.client.cards.push('y1');

                    

                    // this.$forceUpdate();

                }else{
                    this.finishHandler();
                }
            }            
        },
        methods:{
            animationFinish:function(anim){
                anim.animatables[0].target.hidden = true;                
                this.finishHandler();
            },
            animationStart:function(anim){
                anim.animatables[0].target.hidden = false;
            },
            
            clientTakeCard:function(card){

            },
            clientPlaceCard:function(card){

            },
            opponentTakeCard:function(card){

            },                                                
            opponentPlaceCard:function(card){

            },
            
            getClientCardsDiff:function(){
               
                let difference = this.state.client.cards
                    .filter(x => !this.newState.client.cards.includes(x))
                    .concat(this.newState.client.cards.filter(x => !this.state.client.cards.includes(x)));

                return difference;
            },

            getClientCardsRemoved:function(){
                
            },
            getClientCardsTaken:function(){
                
            }
        },
        mounted:function(){
            
        }
    }
</script>

<style scoped>
    .redrect{
        position:absolute;
        width:100px;
        height:100px;
        background-color: red;
    }
</style>