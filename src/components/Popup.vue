<template>
    <div class="popup">
        <div class="message" :class="type">{{message}}</div>                
        <div class="block" v-if="showButton"> 
            <div class="big-yellow-button" @click="buttonHandler"><i class="fa" :class="'fa-'+icon"></i> {{buttonText}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Popup",
        props:['type', 'message', 'buttonText', 'buttonHandler', 'showButton', 'icon'],
    }
</script>

<style scoped>
    .popup{
        width:100%;
        height:auto;
        line-height:80px;
        position:relative;
        left:0;
        top:100px;
        background: rgba(0,0,0,0.6);
    }
    .popup:before{
        content:"";
        display: block;
        width:100%;
        height:20px;
        top:-20px;
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
        position:relative;
    }
    .popup:after{
        content:"";
        display: block;
        width:100%;
        height:20px;
        bottom:-20px;
        background: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
        position:relative;
    }    

    .popup .message{
        display: block;
        width:100%;
        position: relative;
        left:0;
        text-align: center;
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        letter-spacing: 0px;
        word-spacing: 0.2px;
        font-weight: 700;
        filter: drop-shadow(0px 4px 4px black); 
    	background: #ffbf00;
    }
    .popup .win{
        height:50px;
        line-height:50px;
        font-size: 58px;
        background: linear-gradient(to bottom, rgba(248,80,50,1) 0%, rgba(241,111,92,1) 50%, rgba(246,41,12,1) 51%, rgba(240,47,23,1) 71%, rgba(231,56,39,1) 100%);        
        background-clip: text;
        -webkit-text-fill-color: transparent;         
    }
    .popup .wait{
        height:50px;
        line-height:45px;
        font-size: 45px;
        background: linear-gradient(to bottom, rgba(164,179,87,1) 0%, rgba(117,137,12,1) 100%);
        background-clip: text;
        -webkit-text-fill-color: transparent;         
    }    
    .popup .block{
        width:100%;
        height:auto;
        line-height:50px;
        position: relative;
        left:0;
        text-align: center;
        margin-top:30px;
    }
    .big-yellow-button {
        margin:auto;
        font-family: 'Ubuntu', georgia;
        text-align: center;
      	display: block;
		width: 300px;
		height: 61px;
        line-height:61px;
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