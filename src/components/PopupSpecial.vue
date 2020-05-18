<template>
    <Popup>
        <template v-slot:topRow>
            <div class="card-float">
                <Card :type="'r'+type" :clickHandler="clickHandler" hover="true"></Card>
            </div>
            <div class="card-float">
                <Card :type="'y'+type" :clickHandler="clickHandler" hover="true"></Card>
            </div>
            <div class="card-float">
                <Card :type="'g'+type" :clickHandler="clickHandler" hover="true"></Card>
            </div>
            <div class="card-float">
                <Card :type="'b'+type" :clickHandler="clickHandler" hover="true"></Card>
            </div>                        
        </template>
    </Popup>
</template>

<script>

    import Popup from "../common/Popup"
    import Card from "./Card" 

    export default {
        name: "PopupSpecial",
        props:['clickHandler', 'type'],
        components: {Popup, Card}
    }
</script>

<style scoped>
    .card-float{
        display: inline-block;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>