import Vue from 'vue'
import ClientApp from './clientApp.vue'
import VueCookies from 'vue-cookies'
//import anime from 'animejs/lib/anime.es.js';
//import VueAnime from 'vue-animejs';
//Vue.use(VueAnime)

//https://www.npmjs.com/package/vue-animejs
//https://animejs.com/

Vue.use(VueCookies)

new Vue({
    el: '#clientApp',
    render: h => h(ClientApp)
});
