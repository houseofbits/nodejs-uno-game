<template>
    <div class="placeholder" :style="transform">
        <Card :type="data.type" :clickHandler="clickHandler" hover="true"></Card>
    </div>
</template>

<script>
    
    import Card from "./Card" 

    export default {
        name: "CardActive",
        props: ['data', 'clickHandler'],
        components:{Card},
        computed:{
            transform:function () {
                return { transform: ' rotate('+this.data.angle+'deg) translate('+this.data.x+'px,'+this.data.y+'px)' };
            }
        }
    }
</script>

<style scoped>
    .placeholder{
        transform-origin: 46px 70px;
        display:block;
        position:absolute;
        width:93px;
        height:140px;
        border-radius:8px;
    }     
</style>