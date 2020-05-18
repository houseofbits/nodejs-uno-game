<template>
    <Popup>
        <template v-slot:topRow>
            <div class="card-center">
                <Card :type="card"></Card>
            </div>
        </template>
        <template v-slot:bottomRow>
            <div class="button-float">
                <Button faIcon="arrow-circle-up" :clickHandler="leave">Place</Button>
            </div>
            <div class="button-float">
                <Button faIcon="arrow-circle-down" :clickHandler="takeHandler">Take</Button>
            </div>            
        </template>        
    </Popup>
</template>

<script>

    import Popup from "../common/Popup"
    import Card from "./Card" 
    import Button from "../common/Button"

    export default {
        name: "PopupTake",
        props:['takeHandler','leaveHandler','card'],
        components: {Popup, Card, Button},
        methods:{
            leave:function(){
                this.leaveHandler(this.card);
            }
        }
    }
</script>

<style scoped>
    .card-center{
        display: inline-block;
    }
    .button-float{
        display: inline-block; 
        margin-left: 15px;       
        margin-right: 15px;               
        margin-top: 20px;
    }
</style>