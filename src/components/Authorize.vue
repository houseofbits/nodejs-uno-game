<template>
    <div class="login-box" v-if="!client.code">

        <div class="row">
            <input type="text" placeholder="Channel" class="input" v-model="room"/>
        </div>
        <div class="row">
            <input type="text" placeholder="Type your name" class="input" v-model="client.name"/>
        </div>        
        <div class="row">
            <div class="big-yellow-button" @click="login"><i class="fa fa-sign-in-alt"></i> Join</div>
        </div>
        <!--input type="text" placeholder="Type your name" class="text-input" v-model="client.name"/>

        <input type="text" placeholder="Channel" class="username" v-model="room"/>        

        <button class="login" @click="login">Join</button>

        <div class="big-yellow-button" @click="login">Join</div>

        <div class="error" v-if="error">{{error}}</div-->
    </div>
</template>

<script>
    export default {
        name: "Authorize",
        props: ['client', 'socket'],
        data: function() {
            return {
                error:false,
                room:null
            }
        },
        methods:{
            login:function () {
                if(this.client.name.length > 0) {
                    this.socket.emit('create', this.room);
                    this.socket.emit('login', {'client': this.client});
                }
            }
        },
        mounted:function () {   }
    }
</script>

<style scoped>
    .login-box{
        top:50px;
        position:relative;
        width:340px;
        height:auto;
        margin:0 auto;
        border-bottom:solid 1px #000000;
        border-top:solid 1px #000000;
        border-left:solid 1px #9a6515;
        border-right:solid 1px #9a6515;
        border-radius:12px;
        background:url('../../public/img/table.jpg');
        box-shadow:0 6px 12px #000;
    }
    .row{
        width:100%;
        position:relative;
        margin-top:30px;
        margin-bottom:30px;
    }

    .input{
        display: block;
        position:relative;
        width:200px;
        height:28px;
        line-height: 28px;
        font-size:27px;
        margin:auto;           
    }

    input{
        padding:5px;
        border:none;
        border-bottom:solid 1px #d4cda4;
        color:#ffffff;
        font-weight:bold;
        width:90px;
        margin:5px;
        cursor: pointer;
        text-shadow:0 1px 0 #000;
        background: transparent;        
    }
    .error{
        position:absolute;
        left:0;
        right:0;
        top:50%;
        margin-top:-30px;
        height:60px;
        background:rgba(180,0,0,0.7);
        color:#ffffff;
        font-weight:bold;
        font-size:18px;
        line-height:60px;
        text-align:center;
        z-index:100;
        box-shadow:0 2px 6px rgba(0,0,0, 0.5);
    }

    .big-yellow-button {
        position:relative;
        margin:auto;
        font-family: 'Ubuntu', georgia;
        text-align: center;
      	display: block;
		width: 190px;
		height: 61px;
        line-height: 61px;
		border-radius: 35px;
		box-sizing: border-box;
		font-size: 35px;
		text-decoration: none;
		color: green;
		font-weight: bold;
		font-family: arial;
        filter: drop-shadow(0px 5px 3px black);
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.54) inset, 0 -2px 1px rgba(0, 0, 0, 0.31) inset;
		background: #ffbf00;
		background: linear-gradient(to bottom,  #ffbf00 0%,#ff9700 100%);
        box-shadow: 0px 10px 32px -6px rgba(0,0,0,0.75);
        text-shadow: 0px 1px 1px white;
    }
    .big-yellow-button:after {
        content: '';
        border-radius: 38px;
        position: absolute;
        top: -6px;
        left: -6px;
        bottom: -6px;
        right: -6px;
        border:solid 6px rgba(255, 255, 255, 0.4);
    }
    .big-yellow-button:hover {
        background: #ffdc00;
        background: linear-gradient(to bottom,  #ffdc00 0%,#ffa700 100%);
        text-shadow: none;
    }
    .big-yellow-button:active {
        padding-top:2px;
        background: #ff9100;
        background: linear-gradient(to bottom,  #ff9100 0%,#ffb300 100%);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.32) inset, 0 -1px 0px white inset;
        text-shadow: none;    
    } 

</style>