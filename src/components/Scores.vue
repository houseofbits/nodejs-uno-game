<template>
    <div class="scores">
        <div class="column" v-for="(client,index) in clients" :key="index">
            <div class="cell">{{client.name}}</div>
            <div class="cell" v-for="(score,ind2) in client.score" :key="ind2">{{score}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Popup",
        props:['clients'],
    }
</script>

<style scoped>
    .scores{
        position: absolute;
        width:250px;
        height:150px;
        left:500px;
        top:160px;
        transform: rotateZ(3deg);
    }
    .column{
        position:relative;
        width:60px;
        height:100%;
        float:left;
        border-left:solid 1px white;
    }
    .cell{
        position:relative;
        width:100%;
        height:25px;
        color: white;
        text-align: center;
        line-height: 25px;
        font-size: 16px;
        text-shadow: 0px 1px 2px black;
    }
    .cell:nth-child(1){
        border-bottom:solid 1px white;
    }
    .column:first-child{
        border-left:none;
    }    
</style>