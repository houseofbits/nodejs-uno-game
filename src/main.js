import Vue from 'vue'
import ClientApp from './clientApp.vue'
import VueCookies from 'vue-cookies'
import VueAnime from 'vue-animejs'

//import anime from 'animejs/lib/anime.es.js';
//import VueAnime from 'vue-animejs';
//Vue.use(VueAnime)

//https://www.npmjs.com/package/vue-animejs
//https://animejs.com/

import  '../node_modules/@fortawesome/fontawesome-free/css/all.css'
 
Vue.use(VueAnime)
Vue.use(VueCookies)

new Vue({
    el: '#clientApp',
    render: h => h(ClientApp)
});
