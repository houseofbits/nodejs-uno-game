<template>
    <div class="name" :class="{active:turn}">{{name}}</div>
</template>

<script>
    export default {
        name: "NamePlate",
        props: ['name', 'turn'],
    }
</script>

<style scoped>
    .name{
        background: linear-gradient(to bottom, #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%);
        height:30px;
        line-height: 30px;
        text-align: center;
        vertical-align: middle;
        width:80px;
        border-radius: 6px;
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        font-size: 20px;
        letter-spacing: -2px;
        word-spacing: 0.2px;
        color: #6FFF33;
        font-weight: 700;
        text-shadow: -1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5);
        box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
    }
    .active{
        border:solid 3px #6FFF33;
    }
</style>