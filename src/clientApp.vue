<template>
    <div>
        <UnoGame :socket="socket"></UnoGame>
    </div>
</template>

<script>

    import socket from 'socket.io-client'    
    import UnoGame from "./UnoGame"

    export default {
        name: "clientApp",
        data: function() {
            return {               
                socket: socket("http://" + window.location.hostname + ":" + window.location.port),
            }
        },
        components: {
            UnoGame
        },
    }
</script>

<style scoped>

</style>

<style>
    body {
        background: #1b1b21 url('../public/img/page_bg.png') repeat-x;
        margin:0 auto;
        width:100%;
        font: 12px normal Verdana, Arial, Helvetica, sans-serif;
        user-select: none;
        overflow: hidden;
        transform: scale(1.0);
    }
    a{
        text-decoration:none;
        color:inherit;
    }

</style>