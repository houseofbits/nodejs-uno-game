<template>
    <div class="button" @click="clickHandler"><i :class="'fa fa-'+faIcon"></i> <slot></slot></div>
</template>

<script>
    export default {
        name: "Button",
        props: ['faIcon', 'clickHandler']
    }
</script>

<style scoped>
    .button {
        position:relative;
        font-family: 'Ubuntu', georgia;
        text-align: center;
      	display: inline;
        padding:10px 30px;  
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
    .button:after {
        content: '';
        border-radius: 38px;
        position: absolute;
        top: -6px;
        left: -6px;
        bottom: -6px;
        right: -6px;
        border:solid 6px rgba(255, 255, 255, 0.4);
    }
    .button:hover {
        background: #ffdc00;
        background: linear-gradient(to bottom,  #ffdc00 0%,#ffa700 100%);
    }
    .button:active {
        background: #ff9100;
        background: linear-gradient(to bottom,  #ff9100 0%,#ffb300 100%);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.32) inset, 0 -1px 0px white inset;
        text-shadow: none;   
    } 

</style>