<template>
    <div class="table">
        <div class="grad"></div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Board"
    }
</script>

<style scoped>
    .table{
        position:absolute;
        width:100%;
        height:100%;        
        border-bottom:solid 1px #000;
        border-top:solid 1px #000;
        border-left:solid 1px #9a6515;
        border-right:solid 1px #9a6515;
        border-radius:12px;
        background:url('../../public/img/table.jpg')no-repeat;
        background-repeat: round;
        box-shadow:0 6px 12px #000;
        transform-style: preserve-3d;
        /*perspective: 1000px;*/
    }
    .grad{
        position:relative;
        width:100%;
        height:100px;
        background:url('../../public/img/bg_grad.png')no-repeat;
        background-repeat: round;
    }
</style>